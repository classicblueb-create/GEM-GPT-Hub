import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export type Tier = 'free' | 'premium' | 'vip';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  tier: Tier;
  occupation: string;
  favorites: string[];
  createdAt: Date;
  lastLoginAt: Date;
  requestCount: number;
  requestLimit: number;
}

class AuthService {
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;

  constructor() {
    // Listen to auth state changes
    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;
      if (user) {
        await this.loadUserProfile(user.uid);
      } else {
        this.userProfile = null;
      }
    });
  }

  // Get tier limits
  private getTierLimits(tier: Tier) {
    switch (tier) {
      case 'free':
        return 3;
      case 'premium':
        return 100;
      case 'vip':
        return 1000;
      default:
        return 3;
    }
  }

  // Load user profile from Firestore
  private async loadUserProfile(uid: string): Promise<void> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.userProfile = {
          uid,
          email: data.email,
          displayName: data.displayName || 'ผู้ใช้งาน',
          tier: data.tier || 'free',
          occupation: data.occupation || 'ยังไม่ระบุอาชีพ',
          favorites: data.favorites || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: new Date(),
          requestCount: data.requestCount || 0,
          requestLimit: this.getTierLimits(data.tier || 'free'),
        };
      } else {
        // Create new user profile
        await this.createUserProfile(uid);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  // Create new user profile
  private async createUserProfile(uid: string): Promise<void> {
    if (!this.currentUser) return;

    const newProfile: UserProfile = {
      uid,
      email: this.currentUser.email || '',
      displayName: this.currentUser.displayName || 'ผู้ใช้งาน',
      tier: 'free',
      occupation: 'ยังไม่ระบุอาชีพ',
      favorites: [],
      createdAt: new Date(),
      lastLoginAt: new Date(),
      requestCount: 0,
      requestLimit: 3,
    };

    try {
      await setDoc(doc(db, 'users', uid), {
        ...newProfile,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      });
      this.userProfile = newProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  // Sign up with email and password
  async signUp(email: string, password: string, displayName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      return userCredential.user;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!this.currentUser || !this.userProfile) return;

    try {
      const updateData: any = {};
      if (updates.displayName) updateData.displayName = updates.displayName;
      if (updates.occupation) updateData.occupation = updates.occupation;
      if (updates.favorites) updateData.favorites = updates.favorites;

      await updateDoc(doc(db, 'users', this.currentUser.uid), updateData);

      // Update local profile
      this.userProfile = { ...this.userProfile, ...updates };
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  // Toggle favorite
  async toggleFavorite(blueprintId: string): Promise<void> {
    if (!this.userProfile) return;

    const favorites = this.userProfile.favorites.includes(blueprintId)
      ? this.userProfile.favorites.filter(id => id !== blueprintId)
      : [...this.userProfile.favorites, blueprintId];

    await this.updateProfile({ favorites });
  }

  // Increment request count
  async incrementRequestCount(): Promise<boolean> {
    if (!this.userProfile) return false;

    const newCount = this.userProfile.requestCount + 1;
    if (newCount > this.userProfile.requestLimit) {
      return false; // Exceeded limit
    }

    try {
      await updateDoc(doc(db, 'users', this.userProfile.uid), {
        requestCount: newCount,
      });
      this.userProfile.requestCount = newCount;
      return true;
    } catch (error) {
      console.error('Error incrementing request count:', error);
      return false;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get user profile
  getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Get remaining requests
  getRemainingRequests(): number {
    if (!this.userProfile) return 0;
    return Math.max(0, this.userProfile.requestLimit - this.userProfile.requestCount);
  }

  // Firebase error message mapping
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'อีเมลนี้ถูกใช้งานแล้ว';
      case 'auth/weak-password':
        return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      case 'auth/invalid-email':
        return 'รูปแบบอีเมลไม่ถูกต้อง';
      case 'auth/user-not-found':
        return 'ไม่พบผู้ใช้งานนี้';
      case 'auth/wrong-password':
        return 'รหัสผ่านไม่ถูกต้อง';
      case 'auth/too-many-requests':
        return 'มีการพยายามเข้าสู่ระบบมากเกินไป กรุณาลองใหม่อีกครั้ง';
      case 'auth/popup-closed-by-user':
        return 'การเข้าสู่ระบบถูกยกเลิก';
      default:
        return 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
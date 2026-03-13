import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Blueprint } from '../data';

export class BlueprintService {
  private static instance: BlueprintService;
  private collectionName = 'blueprints';

  static getInstance(): BlueprintService {
    if (!BlueprintService.instance) {
      BlueprintService.instance = new BlueprintService();
    }
    return BlueprintService.instance;
  }

  async getAllBlueprints(): Promise<Blueprint[]> {
    try {
      const q = query(collection(db, this.collectionName), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Blueprint));
    } catch (error) {
      console.error('Error fetching blueprints:', error);
      throw error;
    }
  }

  async uploadBlueprint(blueprintData: Omit<Blueprint, 'id'>): Promise<string> {
    try {
      // Validate blueprint data
      this.validateBlueprint(blueprintData);

      const docRef = await addDoc(collection(db, this.collectionName), {
        ...blueprintData,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error uploading blueprint:', error);
      throw error;
    }
  }

  async updateBlueprint(id: string, blueprintData: Partial<Blueprint>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...blueprintData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating blueprint:', error);
      throw error;
    }
  }

  async deleteBlueprint(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error) {
      console.error('Error deleting blueprint:', error);
      throw error;
    }
  }

  async uploadBlueprintsFromJSON(jsonString: string): Promise<{ success: number; errors: string[] }> {
    try {
      const blueprints = JSON.parse(jsonString);

      if (!Array.isArray(blueprints)) {
        throw new Error('JSON must contain an array of blueprints');
      }

      const results = { success: 0, errors: [] as string[] };

      for (const blueprint of blueprints) {
        try {
          await this.uploadBlueprint(blueprint);
          results.success++;
        } catch (error) {
          results.errors.push(`Blueprint "${blueprint.title}": ${error.message}`);
        }
      }

      return results;
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}`);
    }
  }

  private validateBlueprint(blueprint: Omit<Blueprint, 'id'>): void {
    if (!blueprint.title?.trim()) {
      throw new Error('Title is required');
    }
    if (!blueprint.category?.trim()) {
      throw new Error('Category is required');
    }
    if (!blueprint.description?.trim()) {
      throw new Error('Description is required');
    }
    if (!blueprint.logic_template?.trim()) {
      throw new Error('Logic template is required');
    }
    if (!Array.isArray(blueprint.input_fields) || blueprint.input_fields.length === 0) {
      throw new Error('At least one input field is required');
    }

    // Validate input fields
    blueprint.input_fields.forEach((field, index) => {
      if (!field.label?.trim()) {
        throw new Error(`Input field ${index + 1}: label is required`);
      }
      if (!field.name?.trim()) {
        throw new Error(`Input field ${index + 1}: name is required`);
      }
      if (!['text', 'textarea', 'select', 'number'].includes(field.type)) {
        throw new Error(`Input field ${index + 1}: invalid type. Must be text, textarea, select, or number`);
      }
    });

    if (!['free', 'premium', 'vip'].includes(blueprint.tier)) {
      throw new Error('Tier must be free, premium, or vip');
    }
  }
}

export const blueprintService = BlueprintService.getInstance();
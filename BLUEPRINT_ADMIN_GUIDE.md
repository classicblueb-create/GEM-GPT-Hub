# Blueprint Management Guide สำหรับ Admin

## ภาพรวม
ระบบ Blueprint Management จัดการผ่าน Firebase Console หรือ Admin Script เท่านั้น ไม่มี UI บนเว็บสำหรับ admin

## วิธีการจัดการ Blueprint

### วิธีที่ 1: Firebase Console (แนะนำ)

#### 1. เข้าสู่ Firebase Console
- เข้า https://console.firebase.google.com/
- เลือก project ของคุณ

#### 2. เข้าสู่ Firestore Database
- เลือก "Firestore Database" จากเมนูด้านซ้าย
- เลือก collection "blueprints"

#### 3. เพิ่ม/แก้ไข Blueprint
- คลิก "Add document" เพื่อเพิ่ม blueprint ใหม่
- หรือคลิก document ที่มีอยู่เพื่อแก้ไข

#### 4. กรอกข้อมูล Blueprint
```json
{
  "title": "ชื่อ Blueprint",
  "category": "หมวดหมู่",
  "description": "คำอธิบาย",
  "logic_template": "Template สำหรับ generate prompt",
  "input_fields": [
    {
      "label": "ชื่อฟิลด์",
      "type": "text|textarea|select|number",
      "placeholder": "ตัวอย่าง",
      "name": "ชื่อตัวแปร"
    }
  ],
  "tier": "free|premium|vip",
  "createdAt": "Firebase Timestamp",
  "updatedAt": "Firebase Timestamp"
}
```

### วิธีที่ 2: Admin Script (สำหรับ Batch Upload)

#### 1. สร้างไฟล์ admin script
```javascript
// admin-upload-blueprints.js
import { blueprintService } from './src/services/blueprintService.js';

const blueprintsData = [
  {
    title: "Sales Email Generator",
    category: "Sales",
    description: "สร้างอีเมลขายสินค้าที่น่าสนใจ",
    logic_template: "Write a sales email for {{product}}...",
    input_fields: [
      {
        label: "สินค้า/บริการ",
        type: "text",
        placeholder: "เช่น ซอฟต์แวร์จัดการร้านอาหาร",
        name: "product"
      }
    ],
    tier: "free"
  }
];

async function uploadBlueprints() {
  try {
    for (const blueprint of blueprintsData) {
      await blueprintService.uploadBlueprint(blueprint);
      console.log(`Uploaded: ${blueprint.title}`);
    }
    console.log('All blueprints uploaded successfully!');
  } catch (error) {
    console.error('Error uploading blueprints:', error);
  }
}

uploadBlueprints();
```

#### 2. รัน script
```bash
node admin-upload-blueprints.js
```

## JSON Format Specification

### Required Fields
- `title`: string - ชื่อ blueprint
- `category`: string - หมวดหมู่
- `description`: string - คำอธิบาย
- `logic_template`: string - Template สำหรับ generate prompt
- `input_fields`: array - รายการฟิลด์ input
- `tier`: "free" | "premium" | "vip" - ระดับสิทธิ์

### Input Field Types
- `text`: ฟิลด์ข้อความธรรมดา
- `textarea`: ฟิลด์ข้อความยาว
- `select`: ฟิลด์เลือกจากตัวเลือก (ต้องมี `options` array)
- `number`: ฟิลด์ตัวเลข

### Logic Template Syntax
ใช้ `{{variable_name}}` เพื่อแทนที่ค่าจาก input fields

### ตัวอย่าง Logic Template
```
Create a {{type}} for {{purpose}} targeting {{audience}}
```

## การจัดการ Blueprint ที่มีอยู่

### แก้ไข Blueprint
- ใน Firebase Console: คลิก document ที่ต้องการแก้ไข
- อัปเดตฟิลด์ที่ต้องการเปลี่ยน
- ระบบจะอัปเดต `updatedAt` อัตโนมัติ

### ลบ Blueprint
- ใน Firebase Console: คลิก document ที่ต้องการลบ
- คลิก "Delete document"

### Backup & Export
- ใช้ Firebase Console เพื่อ export collection
- หรือใช้ Firebase Admin SDK สำหรับ backup อัตโนมัติ

## Validation Rules

Blueprint จะถูก validate โดย BlueprintService:

### Error Cases
- **Title is required**: ต้องมีฟิลด์ `title`
- **Category is required**: ต้องมีฟิลด์ `category`
- **Description is required**: ต้องมีฟิลด์ `description`
- **Logic template is required**: ต้องมีฟิลด์ `logic_template`
- **At least one input field is required**: ต้องมี `input_fields` อย่างน้อย 1 ฟิลด์
- **Invalid tier**: Tier ต้องเป็น "free", "premium", หรือ "vip"
- **Invalid input field type**: Type ต้องเป็น "text", "textarea", "select", หรือ "number"

## Best Practices

1. **Test Locally First**: ทดสอบ JSON ใน development ก่อน
2. **Use Descriptive Names**: ตั้งชื่อฟิลด์ให้ชัดเจน
3. **Validate Templates**: ตรวจสอบ logic_template ให้ถูกต้อง
4. **Categorize Properly**: จัดหมวดหมู่ให้เหมาะสม
5. **Backup Regularly**: สำรองข้อมูล blueprint เป็นประจำ
6. **Version Control**: ใช้ Git สำหรับ tracking การเปลี่ยนแปลง script

## Troubleshooting

### Firebase Connection Issues
- ตรวจสอบ Firebase config ใน environment variables
- ตรวจสอบสิทธิ์การเข้าถึง Firestore
- ตรวจสอบ network connection

### Validation Errors
- ตรวจสอบ JSON format ให้ถูกต้อง
- ตรวจสอบ required fields ให้ครบ
- ตรวจสอบ data types ให้ถูกต้อง

### App Not Loading New Blueprints
- รอ 1-2 นาทีให้ cache clear
- ตรวจสอบ Firebase Console ว่าข้อมูลถูกบันทึกแล้ว
- ตรวจสอบ browser console สำหรับ error messages

## Security Notes

- Blueprint management ทำผ่าน Firebase Console เท่านั้น
- ไม่มี UI บนเว็บเพื่อป้องกัน unauthorized access
- ใช้ Firebase Security Rules เพื่อควบคุมสิทธิ์การเข้าถึง
- Admin script ควรเก็บไว้ใน repository แยก (private)

## Support
หากพบปัญหา สามารถติดต่อทีมพัฒนาได้

## JSON Format Specification

### Required Fields
- `title`: string - ชื่อ blueprint
- `category`: string - หมวดหมู่
- `description`: string - คำอธิบาย
- `logic_template`: string - Template สำหรับ generate prompt
- `input_fields`: array - รายการฟิลด์ input
- `tier`: "free" | "premium" | "vip" - ระดับสิทธิ์

### Input Field Types
- `text`: ฟิลด์ข้อความธรรมดา
- `textarea`: ฟิลด์ข้อความยาว
- `select`: ฟิลด์เลือกจากตัวเลือก (ต้องมี `options` array)
- `number`: ฟิลด์ตัวเลข

### Logic Template Syntax
ใช้ `{{variable_name}}` เพื่อแทนที่ค่าจาก input fields

### ตัวอย่าง Logic Template
```
Create a {{type}} for {{purpose}} targeting {{audience}}
```

## การจัดการ Blueprint ที่มีอยู่

### แก้ไข Blueprint
- ใช้ Firebase Console หรือสร้าง blueprint ใหม่ด้วย ID เดิม

### ลบ Blueprint
- ใช้ Firebase Console เพื่อลบ document

### Backup
- Export collection จาก Firebase Console เป็น JSON

## Troubleshooting

### Error: "Title is required"
- ตรวจสอบว่า JSON มีฟิลด์ `title`

### Error: "Invalid tier"
- Tier ต้องเป็น "free", "premium", หรือ "vip"

### Error: "At least one input field is required"
- ต้องมี `input_fields` อย่างน้อย 1 ฟิลด์

### Firebase Connection Issues
- ตรวจสอบ Firebase config ใน environment variables
- ตรวจสอบสิทธิ์การเข้าถึง Firestore

## Best Practices

1. **Test Locally First**: ทดสอบ JSON ใน development ก่อน
2. **Use Descriptive Names**: ตั้งชื่อฟิลด์ให้ชัดเจน
3. **Validate Templates**: ตรวจสอบ logic_template ให้ถูกต้อง
4. **Categorize Properly**: จัดหมวดหมู่ให้เหมาะสม
5. **Backup Regularly**: สำรองข้อมูล blueprint เป็นประจำ

## Support
หากพบปัญหา สามารถติดต่อทีมพัฒนาได้
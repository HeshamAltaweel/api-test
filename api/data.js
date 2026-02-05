// api/data.js
import { readFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  // السماح لطلبات GET فقط
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'الطريقة غير مسموحة' });
  }

  try {
    // مسار ملف البيانات
    const dataPath = join(process.cwd(), 'data', 'courses.json');
    
    // قراءة البيانات
    const fileData = await readFile(dataPath, 'utf8');
    const courses = JSON.parse(fileData);
    
    // الرد بالبيانات
    return res.status(200).json(courses);
    
  } catch (error) {
    console.error('❌ خطأ في قراءة البيانات:', error);
    
    // إذا الملف غير موجود، نرجع مصفوفة فارغة
    return res.status(200).json([]);
  }
}

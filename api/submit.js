// api/submit.js
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  // السماح فقط لطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'الطريقة غير مسموحة' });
  }

  try {
    const data = req.body;
    
    // إضافة معرف فريد وتاريخ
    data.id = Date.now();
    data.submittedAt = new Date().toISOString();
    
    // مسار ملف البيانات
    const dataPath = join(process.cwd(), 'data', 'courses.json');
    
    // قراءة البيانات الحالية
    let existingData = [];
    try {
      const fileData = await readFile(dataPath, 'utf8');
      existingData = JSON.parse(fileData);
    } catch (error) {
      // إذا الملف غير موجود، نبدأ بمصفوفة فارغة
      console.log('إنشاء ملف بيانات جديد');
    }
    
    // إضافة البيانات الجديدة
    existingData.push(data);
    
    // حفظ البيانات في الملف
    await writeFile(dataPath, JSON.stringify(existingData, null, 2), 'utf8');
    
    // الرد بنجاح
    return res.status(200).json({
      success: true,
      message: 'تم حفظ البيانات بنجاح',
      data: data,
      total: existingData.length
    });
    
  } catch (error) {
    console.error('❌ خطأ في حفظ البيانات:', error);
    return res.status(500).json({
      error: 'حدث خطأ في حفظ البيانات',
      details: error.message
    });
  }
}

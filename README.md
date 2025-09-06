# منصة إدارة طلبات التصميم الجرافيكي 🎨✨

منصة ويب احترافية لإدارة طلبات التصميم الجرافيكي مع نظام تتبع متقدم ومكتبة شخصية لكل عميل.

## 🌟 المميزات الرئيسية

### ✅ نظام طلبات ديناميكي
- نموذج طلب تفاعلي متعدد الخطوات
- 8 أنواع تصميم محددة مسبقاً
- رفع ملفات مرجعية متعددة
- تحديد الأولويات والمواعيد النهائية

### 📊 نظام تتبع متقدم
- 7 حالات مختلفة للطلبات
- شريط تقدم مرئي لكل طلب
- تاريخ كامل للتحديثات
- إشعارات فورية

### 🎨 مكتبة التصاميم الشخصية
- عرض شبكي/قائمة للتصاميم
- فلترة وبحث متقدم
- تحميل مباشر للملفات
- معاينة عالية الجودة

### 💬 نظام التواصل
- شات فوري مع المصممين
- إرفاق ملفات في المحادثات
- إشعارات الرسائل الجديدة
- سجل كامل للمحادثات

### 🎪 التصميم السماوي الساحر
- مؤثرات بصرية متقدمة
- انتقالات سلسة
- وضع نهاري/ليلي
- تصميم متجاوب بالكامل

## 🚀 التقنيات المستخدمة

- **Frontend**: Next.js 14, TypeScript, React 18
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL, Prisma ORM
- **Auth**: NextAuth.js
- **Real-time**: Pusher/Socket.io
- **File Upload**: UploadThing
- **State**: Zustand, React Query

## 📦 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- PostgreSQL
- npm/yarn/pnpm

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/yourusername/design-request-platform.git
cd design-request-platform
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد قاعدة البيانات**
```bash
# إنشاء ملف .env.local وإضافة رابط قاعدة البيانات
DATABASE_URL="postgresql://user:password@localhost:5432/design_platform"

# تشغيل Prisma migrations
npm run prisma:migrate
npm run prisma:generate
```

4. **تشغيل المشروع**
```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 🏗️ هيكل المشروع

```
design-request-platform/
├── src/
│   ├── app/                 # صفحات Next.js App Router
│   ├── components/           # مكونات React
│   │   ├── ui/              # مكونات واجهة المستخدم
│   │   └── ...              # مكونات أخرى
│   ├── lib/                 # وظائف مساعدة
│   ├── hooks/               # React hooks مخصصة
│   ├── types/               # TypeScript types
│   └── styles/              # ملفات CSS
├── prisma/
│   └── schema.prisma        # نموذج قاعدة البيانات
├── public/                  # ملفات عامة
└── ...
```

## 📝 نماذج البيانات

### User (المستخدم)
- معلومات الحساب الأساسية
- الأدوار: ADMIN, DESIGNER, CLIENT

### DesignRequest (طلب التصميم)
- تفاصيل الطلب الكاملة
- الحالة والأولوية
- الملفات المرجعية

### Design (التصميم المُسلم)
- ملفات التصميم النهائية
- الإصدارات المختلفة
- حالة الموافقة

### Message (الرسائل)
- محادثات الطلبات
- المرفقات
- حالة القراءة

## 🔐 الأمان

- تشفير كلمات المرور بـ bcrypt
- JWT للمصادقة
- حماية CSRF
- تحقق من صحة المدخلات
- حماية ضد SQL injection عبر Prisma

## 🎯 الخطط المستقبلية

- [ ] تطبيق جوال (React Native)
- [ ] نظام دفع متكامل
- [ ] تقارير وإحصائيات متقدمة
- [ ] AI لاقتراح التصاميم
- [ ] نظام تقييم وملاحظات
- [ ] تكامل مع أدوات التصميم

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [CONTRIBUTING.md](CONTRIBUTING.md) للمزيد من التفاصيل.

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- Email: support@designplatform.com
- Twitter: [@DesignPlatform](https://twitter.com/designplatform)
- Website: [www.designplatform.com](https://www.designplatform.com)

---

صُنع بـ ❤️ باستخدام Next.js و TypeScript
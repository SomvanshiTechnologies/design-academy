import {
  BookText,
  FileBadge,
  GraduationCap,
  BriefcaseBusiness,
  Clock,
  UserCheck
} from 'lucide-react';

export default function WhyUs() {
  const features = [
  {
    title: "UGC Recognised Courses",
    desc: "Degree and diploma programs with national-level accreditation.",
    icon: <GraduationCap className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Curriculum by Experts",
    desc: "Professionally designed course content curated by industry leaders.",
    icon: <BookText className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Qualified Trainers",
    desc: "Learn from certified instructors with real-world experience.",
    icon: <UserCheck className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Industry Internships",
    desc: "Real exposure through internships with top design firms.",
    icon: <BriefcaseBusiness className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Flexible Timings",
    desc: "Attend classes as per your convenience and schedule.",
    icon: <Clock className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Placement Assistance",
    desc: "Dedicated support team to help you land your dream job.",
    icon: <FileBadge className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
];

  
  return (
    <section className=" py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
       
        <h2 className="text-4xl font-semibold dm-sans text-gray-900 mb-12">
          Why we are the  <span className="text-orange-500">best</span> for you 🏆
        </h2>
       <div className="grid grid-cols-2 md:grid-cols-3 border-t-2 border-l-2 border-slate-200">
  {features.map((feature, index) => (
    <div
      key={index}
      className="border-r-2 border-b-2 border-slate-200 p-6 md:p-8 flex flex-col items-center text-center"
    >
      <div className="mb-4">{feature.icon}</div>
      <h4 className="text-lg md:text-2xl tracking-tighter font-semibold text-gray-900 mb-2">
        {feature.title}
      </h4>
      <p className="text-[10px] hidden md:block md:text-sm text-gray-700 font-semibold">{feature.desc}</p>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
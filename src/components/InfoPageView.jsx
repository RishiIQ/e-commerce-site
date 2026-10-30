import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, HelpCircle, BookOpen, FileText, Globe, Clock, Award } from 'lucide-react';

export default function InfoPageView({ pageType, onBack }) {
  const contentMap = {
    faq: {
      title: "FAQs & Customer Support",
      icon: <HelpCircle className="w-8 h-8 text-neutral-900" />,
      text: "Explore our comprehensive knowledge base covering product care, technical sizing, order modifications, and global customer support.",
      details: [
        { q: "How do I care for technical merino wool and performance fabrics?", a: "Machine wash cold on a gentle cycle with like colors. Use mild, eco-friendly detergents. Do not use bleach or fabric softeners. Line dry in the shade to maintain technical elasticity and moisture-wicking properties." },
        { q: "Can I modify or cancel my order after placement?", a: "Because orders are processed immediately at our Montreal fulfillment center to ensure rapid dispatch, modifications are only possible within 30 minutes of placement. Please contact support@Bowies.ca immediately." },
        { q: "How do Bowies reward points work?", a: "Every member earns 10 points for every $1 CAD spent. Points can be redeemed for exclusive discounts, early product releases, and complimentary seasonal gear." },
        { q: "Are all Bowies garments manufactured sustainably?", a: "Yes. We exclusively source OEKO-TEX certified organic cotton, recycled polyester blends, and ethical merino wool from certified non-mulesing farms." }
      ]
    },
    returns: {
      title: "Returns, Exchanges & Warranty",
      icon: <RefreshCw className="w-8 h-8 text-neutral-900" />,
      text: "We stand behind the uncompromising craftsmanship of our apparel and hardware with a straightforward 30-day return policy and 2-year warranty.",
      details: [
        { q: "What items are eligible for return?", a: "Any unworn, unwashed item in its original packaging with all tags attached is eligible within 30 days of delivery. Undergarments and clearance items are final sale." },
        { q: "How do I print my prepaid return shipping label?", a: "Log into your Bowies Account Profile, navigate to your Order History, select the relevant order, and click 'Start Return'. Your prepaid label will be generated instantly." },
        { q: "What does the 2-year craftsmanship warranty cover?", a: "Our warranty covers zipper malfunctions, seam failure, bonded fabric separation, and hardware defects under normal athletic use." },
        { q: "Are exchanges free?", a: "Yes! Size and color exchanges incur zero restocking or return shipping fees." }
      ]
    },
    shipping: {
      title: "Global Delivery & Fulfillment",
      icon: <Truck className="w-8 h-8 text-neutral-900" />,
      text: "Designed for cold climates and dispatched worldwide, Bowies ensures swift, carbon-neutral delivery to your doorstep.",
      details: [
        { q: "What are the standard shipping timelines?", a: "Canada & US: 2–4 business days via Express Priority. International (UK, EU, Australia, Asia): 4–7 business days via air freight." },
        { q: "Do you offer free shipping?", a: "Yes, complimentary express priority shipping is automatically applied to all orders over $150 CAD." },
        { q: "Are customs and import duties covered?", a: "All international shipments are shipped Delivery Duty Paid (DDP), meaning zero unexpected customs fees or border delays upon arrival." },
        { q: "How are packages protected against weather?", a: "All garments and tech gear are packed in moisture-resistant, biodegradable mailers reinforced for severe weather transit." }
      ]
    },
    terms: {
      title: "Terms, Privacy & Security",
      icon: <FileText className="w-8 h-8 text-neutral-900" />,
      text: "Bowies is committed to absolute data privacy, transparent business practices, and secure digital transactions.",
      details: [
        { q: "How is my payment information secured?", a: "We utilize 256-Bit SSL encryption through certified PCI-DSS Level 1 payment gateways. We never store your full credit card credentials on our servers." },
        { q: "How is my personal data handled?", a: "Your personal information is strictly used to process orders, enhance account personalization, and provide member rewards. We never sell or rent data to third-party advertisers." },
        { q: "Intellectual Property Rights", a: "All original photography, typography, product designs, and software architecture are the exclusive intellectual property of Bowies Running Inc." }
      ]
    },
    lookbook: {
      title: "Winter 2026 Editorial Lookbook",
      icon: <BookOpen className="w-8 h-8 text-neutral-900" />,
      text: "Shaped by Canada's distinct climate and uncompromising urban landscapes, our Winter 2026 collection bridges high-output thermal engineering with timeless minimalism.",
      details: [
        { q: "The Climate-Adaptive Design Brief", a: "Engineered specifically for sub-zero training sessions, our technical layers balance breathable airflow with windproof outer membranes." },
        { q: "Architectural Tailoring", a: "Inspired by brutalist architecture and organic forestry, our color palette spans basalt black, pine forest green, frost white, and oak timber brown." },
        { q: "Hardware & Biometric Integration", a: "Our accessories line features titanium bezels, raw carbon fiber pickleball paddles, and seamless smart-apparel compatibility for continuous biometric tracking." }
      ]
    }
  };

  const currentInfo = contentMap[pageType] || contentMap.faq;

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-20 space-y-12 animate-fade-in">
      <button onClick={onBack} className="text-xs uppercase tracking-[0.2em] underline font-semibold cursor-pointer flex items-center gap-2 hover:opacity-75 transition-opacity">
        <ArrowLeft className="w-4 h-4" /> Back to Storefront
      </button>

      <div className="bg-white p-10 sm:p-16 rounded-3xl border border-neutral-200/80 shadow-2xl space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-neutral-100 pb-8">
          <div className="p-5 bg-neutral-100 rounded-2xl w-fit">
            {currentInfo.icon}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-500 bg-neutral-100 px-3.5 py-1.5 rounded-full">
              Bowies Information Center
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl tracking-[0.05em] mt-3 font-normal text-neutral-900">
              {currentInfo.title}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          {currentInfo.text}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-100">
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 flex items-start space-x-3">
            <Globe className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-semibold text-xs text-neutral-900">Global Reach</h4>
              <p className="text-[11px] text-neutral-500 mt-1 font-light">Carbon-neutral delivery across 45+ countries.</p>
            </div>
          </div>
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 flex items-start space-x-3">
            <Clock className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-semibold text-xs text-neutral-900">Rapid Support</h4>
              <p className="text-[11px] text-neutral-500 mt-1 font-light">Assistance available Monday to Saturday.</p>
            </div>
          </div>
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 flex items-start space-x-3">
            <Award className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-semibold text-xs text-neutral-900">2-Year Warranty</h4>
              <p className="text-[11px] text-neutral-500 mt-1 font-light">Guaranteed craftsmanship on all products.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900">Detailed Guidelines & Specifications</h3>
          <div className="space-y-4">
            {currentInfo.details.map((item, idx) => (
              <div key={idx} className="bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-neutral-200/60 space-y-2.5 transition-all hover:shadow-md">
                <h4 className="font-serif text-sm sm:text-base font-semibold text-neutral-900">{item.q}</h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>Need personalized assistance? Reach us at <strong className="text-neutral-900">support@bowies.ca</strong></span>
          <button onClick={onBack} className="bg-neutral-900 text-white px-8 py-3.5 uppercase tracking-wider rounded-xl font-semibold cursor-pointer hover:bg-neutral-800 transition-all shadow-md">
            Return to Storefront
          </button>
        </div>
      </div>
    </div>
  );
}
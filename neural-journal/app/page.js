import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Lock, Book, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];


export default function Home() {
  const home = 1
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl gradient-title">
          Welcome to Neural Journal.<br/> Your AI-powered Journal.
        </h1>
        <p className="text-lg md:text-xl text-orange-800 mb-8">
          This is some filler text. Our app is dope. Lets od some journaling. 
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-transparent to-transparent pointer-events-none z-10"/>
          <div className="bg-white rounded-2xl p-4 max-full mx-auto">
            <div className="border-b border-orange-100 pb-4 mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Calendar className='h-5 w-5 text-orange-600'/>
                <span className="text-orange-900 font-medium">
                  Today's Entry
                </span>
              </div>
              
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-200"/>
                <div className="h-3 w-3 rounded-full bg-orange-300"/>
                <div className="h-3 w-3 rounded-full bg-orange-400"/>
              </div>
            </div>
              <div className="space-y-4 p-4">
                <h3 className="text-xl font-semibold text-orange-900">
                  Daily Prompts
                </h3>
                <Skeleton className='h-4 bg-orange-100 rounded w-3/4'/>
                <Skeleton className='h-4 bg-orange-100 rounded w-full'/>
                <Skeleton className='h-4 bg-orange-100 rounded w-2/3'/>
              </div>
            </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href='/dashboard'>
            <Button variant="journal" className='px-8 py-6 rounded-full flex items-center gap-2'>
              Start Writing <ChevronRight className="h-5 w-5"/>
            </Button>
          </Link>
          <Link href='#features'>
            <Button variant="outline" className='px-8 py-6 rounded-full border-orange-600 text-orange-600 hover:bg-orange-100'>
              Learn More <ChevronRight className="h-5 w-5"/>
            </Button>
          </Link>
        </div>
      </div>
      <section
        id="features"
        className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-xl text-orange-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-orange-700">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

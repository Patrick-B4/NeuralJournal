import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BarChart2, Calendar, ChevronRight, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Lock, Book, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TestimonialCarousel from "@/components/testimonial-carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import faqs from "../data/faqs.json";
import { getDailyPrompt } from "@/actions/public";

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

export default async function Home() {
  const advice = await getDailyPrompt();
  const home = 1;
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl gradient-title">
          Welcome to Neural Journal.
          <br /> Your AI-powered Journal.
        </h1>
        <p className="text-lg md:text-xl text-violet-600 mb-8">
          Lets do some journaling!
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-violet-50 via-transparent to-transparent pointer-events-none z-10" />
          <div className="bg-white rounded-2xl p-4 max-full mx-auto">
            <div className="border-b border-violet-100 pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-violet-600" />
                <span className="text-violet-900 font-medium">
                  Today's Entry
                </span>
              </div>

              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-200" />
                <div className="h-3 w-3 rounded-full bg-violet-300" />
                <div className="h-3 w-3 rounded-full bg-violet-400" />
              </div>
            </div>
            <div className="space-y-4 p-4">
              <h3 className="text-xl font-semibold text-violet-900">
                {advice ? advice : "My Thoughts Today"}
              </h3>
              <Skeleton className="h-4 bg-violet-100 rounded w-3/4" />
              <Skeleton className="h-4 bg-violet-100 rounded w-full" />
              <Skeleton className="h-4 bg-violet-100 rounded w-2/3" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="journal"
              className="px-8 py-6 rounded-full flex items-center gap-2"
            >
              Start Writing <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="px-8 py-6 rounded-full border-violet-600 text-violet-600 hover:bg-violet-100"
            >
              Learn More <ChevronRight className="h-5 w-5" />
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
              <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-xl text-violet-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-violet-700">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-violet-500">
              Rich Text Editor
            </h3>
            <p className="text-violet-200">
              Express yourself with all the things our app can do:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-violet-200">Format text easily</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-violet-200">Embed Links</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-violet-100">
            <div className="flex gap-2 mb-6">
              <div className="h-8 w-8 rounded bg-violet-100" />
              <div className="h-8 w-8 rounded bg-violet-100" />
              <div className="h-8 w-8 rounded bg-violet-100" />
            </div>
            <Skeleton className="h-4 bg-violet-50 rounded w-3/4" />
            <Skeleton className="h-4 bg-violet-50 rounded w-full" />
            <Skeleton className="h-4 bg-violet-50 rounded w-2/3" />
            <Skeleton className="h-4 bg-violet-50 rounded w-1/3" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-violet-100">
            <div className="h-40 bg-gradient-to-t from-violet-100 to-violet-50 rounded-lg"></div>
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-violet-100 rounded" />
              <div className="h-4 w-16 bg-violet-100 rounded" />
              <div className="h-4 w-16 bg-violet-100 rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-violet-500">
              Mood Analytics
            </h3>
            <p className="text-violet-200">
              Track your emotions with our AI analytics:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-violet-200">Visual mood trends</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-violet-200">Pattern recognition</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <TestimonialCarousel />

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-violet-500 mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full mx-auto">
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger className="text-violet-500 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-violet-200">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <div className="mt-24">
        <Card className="bg-gradient-to-r from-violet-100 to-amber-100">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-violet-900 mb-6">
              Start Your Journaling Journey Today
            </h2>
            <p className="text-lg text-violet-700 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who have discovered the power of diginal
              journaling.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="journal" className="animate-bounce">
                Get Started for Free{" "}
                <ChevronRight className="ml-2 h-2 w-4"></ChevronRight>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

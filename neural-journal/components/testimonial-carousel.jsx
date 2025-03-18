"use client";
import React from 'react'
import { Carousel, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import testimonials from '../data/testimonials.json'
import { Card, CardContent } from './ui/card';
import { CarouselContent, CarouselItem, } from './ui/carousel';


const TestimonialCarousel = () => {
  return (
    <div className='mt-24'>
        <h2 className='text-3xl font-bold text-center text-violet-500 mb-12'>What Our Users Say</h2>
        <Carousel
            plugins={[
                Autoplay({
                delay: 2000,
                }),
        ]}>
            <CarouselContent>
                {testimonials.map((testimonal, index) => {
                    return (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Card className='bg-white/100 backdrop-blur-sm'>
                                <CardContent className='p-6'>
                                    <blockquote className='space-y-4'> 
                                        <p className='text-violet-700 italic'>"{testimonal.text}"</p>
                                        <footer>
                                            <div className='font-semibold text-violet-900'>{testimonal.author}</div>
                                            <div className='text-sm text-violet-600'>{testimonal.role}</div>
                                        </footer>
                                    </blockquote>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    )
                })}
                
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default TestimonialCarousel
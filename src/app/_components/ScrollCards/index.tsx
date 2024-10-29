'use client'
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Player } from '@lottiefiles/react-lottie-player'
import styles from './ScrollCards.module.scss'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Free Shipping',
    description: 'Free shipping for orders above $150',
    lottie: '/lottie/free-shipping.json',
  },
  {
    title: 'Money Guarantee',
    description: 'Within 30 days for an exchange',
    lottie: '/lottie/money-back.json',
    className: 'moneyGuarantee',
  },
  {
    title: 'Online Support',
    description: '24 hours a day, 7 days a week',
    lottie: '/lottie/online-support.json',
  },
  {
    title: 'Flexible Payment',
    description: 'Pay with multiple credit cards',
    lottie: '/lottie/flexible-payment.json',
  },
]

const backgroundColors = ['#80024c', '#dfa0f0', '#4e2b9b', '#01d9fa']
const textColors = ['#ffffff', '#000000']

const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const newIsMobile = window.innerWidth <= 768

        if (newIsMobile !== isMobile) {
          if (scrollTriggerInstance.current) {
            scrollTriggerInstance.current.kill()
          }

          window.scrollTo(0, 0)

          if (sectionRef.current) {
            gsap.set(sectionRef.current, { clearProps: 'all' })
          }

          setIsMobile(newIsMobile)
        }
      }, 250)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill()
      }
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile && sectionRef.current && triggerRef.current) {
      // Reset position
      gsap.set(sectionRef.current, { clearProps: 'all' })

      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: `-${services.length * 100}vw`,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${window.innerWidth * services.length}px`, // Added 'px' here
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / services.length,
              duration: { min: 0.2, max: 0.3 },
              delay: 0,
              ease: 'power1.inOut',
            },
            onUpdate: (self) => {
              sessionStorage.setItem('scrollProgress', self.progress.toString())
            },
            onRefresh: (self) => {
              self.scroll(0)
              // Remove the progress setting as it's read-only
            }
          },
        }
      )

      scrollTriggerInstance.current = pin.scrollTrigger

      return () => {
        pin.kill()
        ScrollTrigger.getAll().forEach(st => st.kill())
        gsap.set(sectionRef.current, { clearProps: 'all' })
      }
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = 'auto'
      document.body.style.height = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }
  }, [isMobile])

  return (
    <section 
      className={styles.scrollSectionOuter} 
      ref={triggerRef}
      data-scroll-container
    >
      <div 
        ref={sectionRef} 
        className={styles.scrollSectionInner}
        data-scroll-section
      >
        <div
          className={`${styles.scrollSection} ${styles.introSection} text-center md:text-left -mb-10 md:-mb-0`}
        >
          <h1>Why Choose Momifa?</h1>
        </div>
        {services.map((service, index) => (
          <div key={index} className={styles.scrollSection}>
            <div className={styles.card}>
              <div
                className={styles.cardContent}
                style={{ backgroundColor: backgroundColors[index] }}
              >
                <div className={styles.cardHeading}>
                  <h2 style={{ color: textColors[index % textColors.length] }}>{service.title}</h2>
                  <p style={{ color: textColors[index % textColors.length] }}>
                    {service.description}
                  </p>
                </div>
                <div className={`${styles.lotties} ${styles[service.className] || ''}`}>
                  <Player
                    autoplay
                    loop
                    src={service.lottie}
                    className={`${styles.cardLottie} ${styles[service.className] || ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HorizontalScroll
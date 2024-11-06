'use client'

import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

interface FeedbackItem {
  id: number
  name: string
  company: string
  image: string
  text: string
}

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    name: 'Bautista Cardozo',
    company: '',
    image: 'B',
    text: "The perfect place for basics! I ordered a few tees and polos, and the quality is fantastic. The clothes are comfortable, breathable, and fit just right. Shipping was faster than expected, and the package arrived in perfect shape. I love having so many color options – it makes getting dressed so much easier. This has quickly become my go-to store for everyday wear!",
  },
  {
    id: 2,
    name: 'Franco Ciorciari',
    company: '',
    image: 'F',
    text: 'A hidden gem! I’ve been searching for an online store where I can find quality basics in various colors, and this one has it all. The polos are perfect for casual Fridays and look great with jeans. The clothes feel durable and soft, and I love that they’re simple and classic. Shipping was fast, and the whole experience was seamless. Will definitely be a repeat customer!',
  },
  {
    id: 3,
    name: 'Bautista Veaute',
    company: '',
    image: 'B',
    text: 'Fantastic selection of minimalist clothing! I was looking for basics like tees and polos that I could mix and match easily, and this store has everything I need. The colors are vibrant, the fit is perfect, and the quality is impressive. The shirts held up great after washing. Shipping was faster than I expected, and I received my order without any issues. Definitely recommend for anyone who loves quality and simplicity!',
  },
  {
    id: 4,
    name: 'Growi Support',
    company: '',
    image: 'G',
    text: 'This store really gets simple, classic style! I love having a range of colors to choose from, and the polos have a nice tailored fit that works for both casual and polished looks. Shipping was quick and reliable, and everything arrived as described. It’s refreshing to find an online store with timeless styles that work for any outfit. Highly recommended!',
  },
  {
    id: 5,
    name: 'Allison Willey',
    company: '',
    image: 'A',
    text: 'I recently found this online store, and it’s now my go-to for basics! They have a great selection of colors in simple, versatile designs that go with anything in my closet. The quality of the fabrics is excellent – soft, comfortable, and perfect for everyday wear. I bought a few polos, which look polished yet casual. Shipping was quick, and everything arrived in perfect condition. Highly recommend for anyone looking to build a timeless, versatile wardrobe!',
  },
  {
    id: 6,
    name: 'Tomás Rinaudo',
    company: '',
    image: 'T',
    text: 'I’m so glad I found this store! It’s rare to find quality basics online that come in every color you could want. The t-shirts are perfect for layering, and the polos are versatile enough for work or weekends. Shipping was quick, and my items arrived neatly packaged. I’m really impressed by the attention to detail. Can’t wait to order more!',
  },
  {
    id: 7,
    name: 'seba curdo',
    company: '',
    image: 'S',
    text: "I recently made my first purchase from MOMIFA, and I'm beyond impressed! The quality of the clothing is exceptional – soft, durable, and perfect for everyday wear. I ordered a few basic tees and a polo shirt, and each item arrived promptly, well-packaged, and in perfect condition. The sizing was accurate, and the fit was just right. The polo shirt, in particular, has become a favorite due to its classic look and comfort. It's rare to find a brand that delivers both quality and reliable service, but MOMIFA nails it. Highly recommended!",
  },
  // Add more feedback items as needed
]

const Feedback: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight
      let scrollTop = 0

      const scroll = () => {
        scrollTop += 0.5
        if (scrollTop >= scrollHeight / 2) {
          scrollTop = 0
        }
        scrollContainer.style.transform = `translateY(-${scrollTop}px)`
        requestAnimationFrame(scroll)
      }

      requestAnimationFrame(scroll)
    }
  }, [])

  return (
    <div className={styles.feedbackContainer}>
      <h1 className={styles.backgroundText}>FEEDBACKS</h1>
      <div className={styles.cardWrapper}>
        <div className={styles.cardContainer} ref={scrollRef}>
          {[...feedbackData, ...feedbackData].map((item, index) => (
            <div key={`${item.id}-${index}`} className={styles.card}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.feedbackText}>{item.text}</p>
              <div className={styles.cardHeader}>
                <div className={styles.profilePic}>{item.image}</div>
                <div className={styles.headerInfo}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.company}>{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feedback
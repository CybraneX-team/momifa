'use client'
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Player } from '@lottiefiles/react-lottie-player'
import styles from './ScrollCards.module.scss'
import Image from 'next/image'

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

// const backgroundColors = ['#80024c', '#dfa0f0', '#4e2b9b', '#01d9fa']
const textColors = ['#ffffff', '#000000']

const HorizontalScroll = () => {
  

 

  return (
    <div className={styles.main}> 
      <div className={styles.headingDiv}>
          <h1> Momifa Cares </h1>
      </div>
      <div className={styles.iconDiv}>
      <Image 
        width={5}
        className={styles.imageClass}
        height={5}
        src={"/media/Group 11.svg"}
        alt="image"
      />
         <Image 
        width={5}
        className={styles.imageClassMid}
        height={5}
        src={"/media/Group 14.svg"}
        alt="image"
      />
         <Image 
        width={5}
        height={5}
        src={"/media/Group 15.svg"}
        alt="image"
        className={styles.imageClass}
      />
      </div>
      <div className={styles.LinesDiv}>
        <div >
          <h1 className={styles.headinclass}> Better Payments </h1>
          <ul>
            <li  >Different ways to pay</li>
            <li  >Shop Pay</li>
            <li  >Google Pay</li>
            <li  >Apple Pay</li>
            <li  >Debit and Credit Cards</li>
          </ul>
       </div>
       <div id={styles.div1}>

       </div>
        <div>
        <h1 className={styles.headinclass}> Humane Core Values </h1>
          <ul>
            <li>Nature Friendly Fabric</li>
            <li>Donations towards Autism</li>
            <li>Donations to Veterans</li>
            <li>Sustainable Clothing</li>
          </ul>
        </div>
        <div id={styles.div2}>
        </div>
        <div>
        <h1 className={styles.headinclass}> Premium Quality </h1>
        <ul>
          <li>Crafted with love</li>
          <li>Made by Sri Lankan Artisans</li>
          <li>Finest fabrics used</li>
          <li>100% Cotton</li>
        </ul>
        </div>
        <div id={styles.div3}>
        </div>
        <div>
        <h1 className={styles.headinclass}> 24/7 Customer Service </h1>
        <ul>
          <li>Faster reach with different platforms</li>
          <li>Phone at  732-232-5549</li>
          <li>info@momifa.com</li>
          <li>Multiple Social Media handles</li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default HorizontalScroll
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/the_car_editon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="w-full px-6 relative z-10">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  LEARN MORE ABOUT US
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                ABOUT <span className="text-orange-600">US</span>
              </h1>
              <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                Your trusted automotive partner in Huntingdon, committed to quality, integrity, and exceptional service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="w-full py-16 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-16">
                <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                  <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    ABOUT US
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                  WELCOME TO <span className="text-orange-600">THE CAR EDITION LTD</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p className="text-lg text-gray-300 font-rajdhani leading-relaxed">
                    Welcome to The Car Edition Ltd, your trusted source for high-quality used cars in Huntingdon. We are committed to maintaining quality and integrity in everything we do. Each of our vehicles undergoes a rigorous inspection in our garage, meeting our strict standards for performance, safety, and reliability.
                  </p>
                  <p className="text-lg text-gray-300 font-rajdhani leading-relaxed">
                    We understand the significance of trust when buying a used car, which is why we provide a warranty guarantee on all our cars, ensuring you can shop with confidence.
                  </p>
                  
                  {/* Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link href="/services" className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg shadow-lg">
                      SEE WHAT WE OFFER
                    </Link>
                    <Link href="/contact-us" className="inline-flex items-center border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 font-bold font-orbitron uppercase tracking-wider transition-all duration-300 rounded-lg">
                      CONTACT US
                    </Link>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/logos/about us image.jpg"
                    alt="Car Edition Workshop"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-16">
                <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                  <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    OUR MISSION
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                  OUR <span className="text-orange-600">MISSION</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative h-[500px] rounded-xl overflow-hidden order-2 md:order-1"
                >
                  <Image
                    src="/images/logos/3dcarpic.png"
                    alt="Our Mission"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-6 order-1 md:order-2"
                >
                  <p className="text-lg text-gray-300 font-rajdhani leading-relaxed">
                    We are here to help you discover the perfect car that fits your needs and budget while providing exceptional customer service and a seamless buying experience. As a reputable garage in Huntingdon, we pride ourselves on being a go-to destination for car service, repair and a variety of automotive solutions.
                  </p>
                  <p className="text-lg text-gray-300 font-rajdhani leading-relaxed">
                    Beyond offering top-quality used cars, our experienced mechanics specialise in various automotive services, including Carbon Clean / Walnut Blasting, and Gearbox Flush, Engine rebuilds and much more. Trust us for reliable car service in Huntingdon, as we ensure your vehicle receives the attention it deserves.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="w-full py-16 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-16">
                <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                  <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    MEET OUR TEAM
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                  OUR EXPERT <span className="text-orange-600">PROFESSIONALS</span>
                </h2>
                <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                  Meet the skilled professionals who make The Car Edition your trusted automotive partner.
                </p>
              </div>
              
              {/* Group Photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-orange-600 transition-all duration-300 group">
                  <div className="relative h-[400px] md:h-[500px]">
                    <Image
                      src="/images/logos/about us image.jpg"
                      alt="The Car Edition Team"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-2xl font-bold text-white font-orbitron tracking-wider">THE CAR EDITION TEAM</h3>
                      <p className="text-orange-400 font-rajdhani font-semibold uppercase tracking-wide text-sm mt-1">Our Family</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Directors - 2 Cards */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-8 font-orbitron tracking-wider text-center">OUR <span className="text-orange-600">DIRECTORS</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {[
                    { name: "DIRECTOR 1", role: "CO-FOUNDER & DIRECTOR" },
                    { name: "DIRECTOR 2", role: "CO-FOUNDER & DIRECTOR" }
                  ].map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-orange-600 transition-all duration-300 group"
                    >
                      <div className="relative h-80">
                        <Image
                          src="/images/logos/about us image.jpg"
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="bg-black p-5 text-center">
                        <h3 className="text-lg font-bold text-white mb-1 font-orbitron tracking-wider">{member.name}</h3>
                        <p className="text-orange-400 font-orbitron font-semibold uppercase tracking-wide text-xs">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experts - 4 Cards */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-8 font-orbitron tracking-wider text-center">OUR <span className="text-orange-600">EXPERTS</span></h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: "EXPERT 1", role: "SENIOR TECHNICIAN" },
                    { name: "EXPERT 2", role: "DIAGNOSTIC SPECIALIST" },
                    { name: "EXPERT 3", role: "ENGINE SPECIALIST" },
                    { name: "EXPERT 4", role: "SERVICE TECHNICIAN" }
                  ].map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-orange-600 transition-all duration-300 group"
                    >
                      <div className="relative h-64">
                        <Image
                          src="/images/logos/about us image.jpg"
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="bg-black p-4 text-center">
                        <h3 className="text-lg font-bold text-white mb-1 font-orbitron tracking-wider">{member.name}</h3>
                        <p className="text-orange-400 font-orbitron font-semibold uppercase tracking-wide text-xs">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-16">
                <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                  <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                    OUR ACHIEVEMENTS
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-orbitron tracking-wider leading-tight">
                  PROVEN <span className="text-orange-600">EXCELLENCE</span>
                </h2>
                <p className="text-lg text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
                  Numbers that speak for our commitment to quality and customer satisfaction.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: "10+", label: "Years Experience" },
                  { number: "1000+", label: "Vehicles Repaired" },
                  { number: "100%", label: "Honest Service" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-gray-900/50 border border-gray-700 rounded-xl hover:border-orange-600 transition-all duration-300 group"
                  >
                    <div className="text-5xl font-bold text-orange-600 mb-4 font-orbitron group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                    <div className="text-lg text-white font-rajdhani font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="w-full py-16 bg-gray-800">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  VISIT US TODAY
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase font-orbitron tracking-wider leading-tight">
                EXPERIENCE THE <span className="text-orange-600">DIFFERENCE</span>
              </h2>
              <p className="text-xl text-gray-300 font-rajdhani leading-relaxed max-w-4xl mx-auto">
                Visit The Car Edition today and let our knowledgeable and friendly team guide you through our extensive inventory. Experience the joy of finding your dream car with us – where outstanding customer service meets a commitment to quality, reliability, and a comprehensive suite of automotive solutions, including car maintenance, service and repair.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="w-full py-16 bg-black">
        <div className="w-full px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="border-l-4 border-orange-600 pl-6 mb-8 inline-block">
                <p className="text-orange-600 text-sm font-bold uppercase tracking-wider font-rajdhani mb-2">
                  STAY CONNECTED
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 uppercase font-orbitron tracking-wider leading-tight">
                FOLLOW <span className="text-orange-600">US</span>
              </h2>
              
              <div className="flex justify-center gap-8">
                {[
                  { Icon: FaFacebookF, name: "Facebook", color: "hover:bg-blue-600" },
                  { Icon: FaInstagram, name: "Instagram", color: "hover:bg-pink-600" },
                  { Icon: FaYoutube, name: "YouTube", color: "hover:bg-red-600" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative w-20 h-20 rounded-xl bg-gray-900/50 border border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-orange-600 ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <social.Icon size={28} />
                    <span className="text-xs font-rajdhani font-semibold mt-1">{social.name}</span>
                  </motion.a>
                ))}
              </div>
              
              {/* Call to Action */}
              <div className="mt-16">
                <Link href="/contact-us" className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 font-bold font-orbitron uppercase tracking-wider transition-colors duration-300 rounded-lg shadow-lg text-lg">
                  START YOUR CAR JOURNEY TODAY
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 
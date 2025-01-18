// import React, { useState } from 'react'

// const Menu = () => {
//   const [activeItem, setActiveItem] = useState('Branded Polos')

//   const menuItems = [
//     {
//       name: 'Accessories',
//       gradientClass: 'from-black via-blue-600/80 to-blue-400/80',
//     },
//     {
//       name: 'Branded Polos',
//       gradientClass: 'from-black via-blue-600/90 to-purple-500/90',
//     },
//     {
//       name: 'T-shirts',
//       gradientClass: 'from-black via-purple-600/80 to-purple-400/80',
//     },
//   ]

//   const getDotPosition = itemName => {
//     const index = menuItems.findIndex(item => item.name === itemName)
//     return `${index * 60 + 30}px`
//   }

//   return (
//     <div className="p-8 min-h-[300px] flex items-center">
//       <nav className="relative w-[250px] flex">
//         <div className="flex-1 pr-8">
//           {menuItems.map(item => (
//             <div
//               key={item.name}
//               className="relative group py-2"
//               onMouseEnter={() => setActiveItem(item.name)}
//             >
//               {/* Bg */}
//               <div
//                 className={`absolute inset-0 transition-opacity duration-300 ${
//                   activeItem === item.name ? 'opacity-100' : 'opacity-0'
//                 }`}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-r ${item.gradientClass}`}>
//                   {/* gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/80" />
//                 </div>
//               </div>

//               <div className="relative p-1">
//                 <button
//                   className={`text-right transition-all duration-300  ${
//                     activeItem === item.name
//                       ? 'text-white text-2xl font-bold'
//                       : 'text-gray-500 text-xl'
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Line & Dot */}
//         <div className="relative w-px">
//           <div className="absolute right-0 top-0 w-px h-full bg-gray-700" />
//           <div
//             className="absolute -right-1 w-2 h-2 bg-purple-400 rounded-full transition-all duration-300"
//             style={{
//               top: getDotPosition(activeItem),
//             }}
//           />
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Menu
import React, { useState } from 'react'

const Menu = () => {
  const [activeItem, setActiveItem] = useState('Branded Polos')

  const menuItems = [
    {
      name: 'Accessories',
      gradientClass: 'from-[#0A0610] via-[#2628B6]/50 to-[#7D2CFF]/60',
    },
    {
      name: 'Branded Polos',
      // gradientClass: 'from-black via-blue-600/90 to-purple-500/90',
      gradientClass: 'from-[#0A0610] via-[#716CFF]/50 to-[#FF47FF]/60',
    },
    {
      name: 'T-shirts',
      gradientClass: 'from-[#0A0610] via-[#9E367A]/40 to-[#FF6CCC]/60',
    },
  ]

  const getDotPosition = itemName => {
    const index = menuItems.findIndex(item => item.name === itemName)
    return `${index * 60 + 30}px`
  }

  return (
    <div className="p-8 min-h-[300px] flex items-center">
      <nav className="relative w-[250px] flex">
        <div className="flex-1 pr-8">
          {menuItems.map(item => (
            <div
              key={item.name}
              className="relative group py-2 mt-2"
              onMouseEnter={() => setActiveItem(item.name)}
            >
              {/* Bg */}
              <div className="absolute inset-0">
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    activeItem === item.name ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradientClass}`}>
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/90" />
                  </div>
                </div>
              </div>

              <div className="relative p-1 space-y-2">
                <button
                  className={`w-full text-right transition-all duration-300 ${
                    activeItem === item.name
                      ? 'text-white text-xl font-bold'
                      : 'text-[#888] text-md -p-5 px-1'
                  }`}
                >
                  {item.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Line & Dot */}
        <div className="relative w-px">
          <div className="absolute right-0 top-0 w-px h-full bg-gray-700" />
          <div
            className="absolute -right-1 w-2 h-2 bg-purple-400 rounded-full transition-all duration-300"
            style={{
              top: getDotPosition(activeItem),
            }}
          />
        </div>
      </nav>
    </div>
  )
}

export default Menu

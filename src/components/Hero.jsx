import { useState, useEffect } from 'react'
import FoodDetail from './FoodDetail'
import { db } from '../firebase/firebaseConfig'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'

export default function Hero() {
  const [showModal, setShowModal] = useState(false)
  const [specialOffer, setSpecialOffer] = useState(null)

  useEffect(() => {
    const fetchSpecialOffer = async () => {
      try {
        const q = query(collection(db, 'foodItems'), where('isSpecialOffer', '==', true), limit(1))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          setSpecialOffer({
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          })
        }
      } catch (error) {
        console.error("Error fetching special offer:", error)
      }
    }

    fetchSpecialOffer()
  }, [])

  if (!specialOffer) {
    return null // or a loading state
  }

  return (
    <>
      <div className="bg-cover bg-center rounded-xl p-6 mb-8 relative overflow-hidden" 
           style={{backgroundImage: `url(${specialOffer.image})`}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <div className="text-white max-w-md">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
              Limited time!
            </span>
            <h2 className="text-4xl font-bold mb-2">Get Special Discount</h2>
            <p className="text-6xl font-bold mb-4">{specialOffer.discount}%</p>
            <p className="mb-4">All restaurant available | T&C applied</p>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-green-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Claim
            </button>
          </div>
        </div>
      </div>

      <FoodDetail
        food={specialOffer}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}


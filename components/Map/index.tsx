'use client'

import { RoomType } from '@/interface'
import axios from 'axios'
/*global kakao*/

import Script from 'next/script'
import { BsMap } from 'react-icons/bs'
import { useQuery } from 'react-query'

declare global {
  interface Window {
    kakao: any
  }
}

const DEFAULT_LAT = 37.565337
const DEFAULT_LNG = 126.9772095
const ZOOM_LEVEL = 7

export default function Map() {
  const fetchRooms = async () => {
    const { data } = await axios('/api/rooms')
    return data as RoomType[]
  }

  const { data: rooms, isSuccess } = useQuery('map-rooms', fetchRooms)

  /**
   * Kakao Map API 참고 (지도 띄우기): https://apis.map.kakao.com/web/documentation/#load_load
   */
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      }
      const map = new window.kakao.maps.Map(mapContainer, mapOption)
      console.log(rooms)
      /**
       * Kakao Map API 참고 (마커 띄우기): https://apis.map.kakao.com/web/sample/basicMarker/
       */
      // 숙소 데이터 마커 띄우기
      rooms?.map((room) => {
        // 마커가 표시될 위치입니다
        var markerPosition = new window.kakao.maps.LatLng(room.lat, room.lng)

        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        var content = `<div class="custom_overlay">${room.price?.toLocaleString()}원</div>`

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
        })

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map)
      })
    })
  }
  return (
    <>
      {isSuccess && (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      )}
      <div id="map" className="w-full h-screen"></div>
    </>
  )
}

interface MapButtonProps {
  onClick: () => void
}

export function MapButton({ onClick }: MapButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm sticky bottom-12 mx-auto hover:shadow-lg"
    >
      지도 표시하기 <BsMap className="text-xs" />
    </button>
  )
}

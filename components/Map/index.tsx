'use client';

/* global kakao */

import { RoomType } from '@/interface';
import axios from 'axios';

import Script from 'next/script';

import { BsMap, BsList } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { currentRoomState } from '@/atom';
import { FullPageLoader } from '../Loader';

declare global {
  interface Window {
    kakao: any
  }
}

const DEFAULT_LAT = 37.565337;
const DEFAULT_LNG = 126.9772095;
const ZOOM_LEVEL = 7;

export default function Map() {
  const setCurrentRoom = useSetRecoilState(currentRoomState);
  const fetchRooms = async () => {
    const { data } = await axios('/api/rooms');
    return data as RoomType[];
  };

  const { data: rooms, isSuccess } = useQuery('map-rooms', fetchRooms);

  /**
   * Kakao Map API 참고 (지도 띄우기): https://apis.map.kakao.com/web/documentation/#load_load
   */
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      /**
       * Kakao Map API 참고 (마커 띄우기): https://apis.map.kakao.com/web/sample/basicMarker/
       */
      // 숙소 데이터 마커 띄우기
      rooms?.map((room) => {
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(room.lat, room.lng);

        const imageSrc = '/images/marker-shadow.png';
        const imageSize = new window.kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
        const imageOption = { offset: new window.kakao.maps.Point(16, 46) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        const content = `<div class="custom_overlay">${room.price?.toLocaleString()}원</div>`;

        // 커스텀 오버레이를 생성합니다
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content,
        });

        customOverlay.setMap(map);

        // 마커에 클릭 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setCurrentRoom(room);
        });
      });

      window.kakao.maps.event.addListener(map, 'click', () => {
        setCurrentRoom(null);
      });
    });
  };
  return (
    <>
      {isSuccess ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoader />
      )}
      <div id="map" className="w-full h-screen" />
    </>
  );
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
      지도 표시하기
      {' '}
      <BsMap className="text-xs" />
    </button>
  );
}

export function ListButton({ onClick }: MapButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 justify-center w-36 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm fixed z-10 inset-x-0 bottom-12 mx-auto hover:shadow-xl"
    >
      목록 표시하기
      {' '}
      <BsList className="text-xs" />
    </button>
  );
}

'use client';

/* global kakao */
import { useState } from 'react';
import { RoomType } from '@/interface';

import Script from 'next/script';
import cn from 'classnames';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { FullPageLoader } from '../Loader';

declare global {
  interface Window {
    kakao: any
  }
}

const ZOOM_LEVEL = 5;

type mapControlType = 'map' | 'sky';

export default function DetailRoomMap({ data }: { data: RoomType }) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(data?.lat, data?.lng),
        level: ZOOM_LEVEL,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      /**
       * Kakao Map API 참고 (마커 띄우기): https://apis.map.kakao.com/web/sample/basicMarker/
       */
      // 숙소 데이터 마커 띄우기

      // 마커가 표시될 위치입니다
      const markerPosition = new window.kakao.maps.LatLng(data.lat, data.lng);

      const imageSrc = '/images/marker-shadow.png';
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(20, 60) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

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
      const content = `<div class="custom_overlay">${data.price?.toLocaleString()}원</div>`;

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content,
      });

      customOverlay.setMap(map);

      /**
       * Kakao Map API 참고 (지도 컨트롤): https://apis.map.kakao.com/web/sample/addMapControl/
       */

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new window.kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    });
  };

  return (
    <>
      {data ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoader />
      )}
      <div id="map" className="w-full h-[500px] relative" />
    </>
  );
}

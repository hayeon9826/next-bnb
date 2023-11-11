const API_URL = 'http://localhost:3000'

// describe('테스트할 NextBnb 페이지를 확인한다.', () => {
//   it('NextBnb 메인 페이지 방문', () => {
//     cy.visit(API_URL)
//   })

//   it('NextBnb 지도 페이지 방문', () => {
//     cy.visit(`${API_URL}/map`)
//   })

//   it('NextBnb 로그인 페이지 방문', () => {
//     cy.visit(`${API_URL}/users/signin`)
//   })

//   it('NextBnb FAQ 페이지 방문', () => {
//     cy.visit(`${API_URL}/faqs`)
//   })

//   it('NextBnb 상세 페이지 방문', () => {
//     cy.visit(`${API_URL}/rooms/269`)
//   })
// })

describe('지역 필터 테스트를 진행한다.', () => {
  beforeEach(() => {
    cy.visit(API_URL)
    cy.wait(500)
  })

  it('필터 열기 버튼을 확인한다.', () => {
    cy.get('[data-cy="filter-open"]').should(
      'have.attr',
      'role',
      'presentation',
    )
  })

  it('필터 열기 버튼을 눌러서 상세 필터를 연다.', () => {
    cy.get('[data-cy="filter-open"]').click({ force: true })
    cy.wait(500)
  })

  it('지역 필터 열기 버튼 유무를 확인한다.', () => {
    cy.get('[data-cy="filter-location"]').contains('여행지')
  })

  it('지역 필터 열기 버튼을 클릭한다.', () => {
    cy.get('[data-cy="filter-location"]').click({ force: true })
    cy.get('[data-cy="filter-location-wrapper"]').contains('지역으로 검색하기')
  })

  it('서울 지역을 선택한다.', () => {
    cy.get('[data-cy="filter-location-서울"]').click({ force: true })
  })

  it('필터 검색 완료 버튼을 눌러서 필터를 닫는다.', () => {
    cy.get('[data-cy="filter-submit"]').click({ force: true })
  })

  it('검색된 숙소 주소에 "서울" 값이 있는지 확인한다.', () => {
    cy.get('[data-cy="room-address"]').first().contains('서울')
  })
})

describe('카테고리 필터 테스트를 진행한다.', () => {})

describe('상세페이지 필터 테스트를 진행한다.', () => {})

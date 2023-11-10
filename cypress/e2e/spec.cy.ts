describe('테스트할 NextBnb 페이지를 확인한다.', () => {
  it('NextBnb 메인 페이지 방문', () => {
    cy.visit('http://localhost:3000')
  })

  it('NextBnb 지도 페이지 방문', () => {
    cy.visit('http://localhost:3000/map')
  })

  it('NextBnb 로그인 페이지 방문', () => {
    cy.visit('http://localhost:3000/users/signin')
  })

  it('NextBnb FAQ 페이지 방문', () => {
    cy.visit('http://localhost:3000/faqs')
  })

  it('NextBnb 상세 페이지 방문', () => {
    cy.visit('http://localhost:3000/rooms/269')
  })
})

describe('카테고리 필터 테스트', () => {})

describe('지역 필터 테스트', () => {})

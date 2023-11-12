const API_URL = 'http://localhost:3000'

describe('테스트할 NextBnb 페이지를 확인한다.', () => {
  it('NextBnb 메인 페이지 방문', () => {
    cy.visit(API_URL)
  })

  it('NextBnb 지도 페이지 방문', () => {
    cy.visit(`${API_URL}/map`)
  })

  it('NextBnb 로그인 페이지 방문', () => {
    cy.visit(`${API_URL}/users/signin`)
  })

  it('NextBnb FAQ 페이지 방문', () => {
    cy.visit(`${API_URL}/faqs`)
  })

  it('NextBnb 상세 페이지 방문', () => {
    cy.visit(`${API_URL}/rooms/269`)
  })
})

describe('지역 필터 테스트를 진행한다.', () => {
  beforeEach(() => {
    cy.visit(API_URL)
    cy.wait(500)
  })

  it('필터 열기 버튼을 확인한다.', () => {
    cy.get('[data-cy="filter-open"]').should('have.attr', 'type', 'button')
  })

  it('필터 열기 버튼을 눌러서 지역 상세 필터 열기 버튼 유무를 확인한다.', () => {
    cy.get('[data-cy="filter-open"]').click()
    cy.wait(500)
    cy.get('[data-cy="filter-location"]').contains('여행지')
  })

  it('지역 필터 열기 버튼을 클릭해서 지역 검색 필터를 확인한다.', () => {
    cy.get('[data-cy="filter-open"]').click()
    cy.wait(500)
    cy.get('[data-cy="filter-location"]').click()
    cy.wait(500)
    cy.get('[data-cy="filter-wrapper"]').contains('지역으로 검색하기')
  })

  it('서울 지역 필터가 잘 작동하는지 확인한다.', () => {
    cy.get('[data-cy="filter-open"]').click()
    cy.wait(500)
    cy.get('[data-cy="filter-location"]').click()
    cy.wait(500)
    it('서울 지역을 선택한다.', () => {
      cy.get('[data-cy="filter-location-서울"]').click()
    })
    cy.wait(500)
    it('필터 검색 완료 버튼을 눌러서 필터를 닫는다.', () => {
      cy.get('[data-cy="filter-submit"]').click()
    })
    cy.wait(500)
    it('검색된 숙소 주소에 "서울" 값이 있는지 확인한다.', () => {
      cy.get('[data-cy="room-address"]').first().contains('서울')
    })
  })
})

describe('카테고리 필터 테스트를 진행한다.', () => {
  beforeEach(() => {
    cy.visit(API_URL)
    cy.wait(500)
  })

  it('카테고리 필터를 확인한다.', () => {
    cy.get('[data-cy="category-filter"]').contains('전체')
  })

  it('"전망좋은" 카테고리를 선택한다.', () => {
    cy.get('[data-cy="category-filter-전망좋은"]').click()
  })

  it('선택한 "전망좋은" 카테고리에 맞는 숙소가 보여지는지 확인한다.', () => {
    cy.get('[data-cy="category-filter-전망좋은"]').click()
    cy.wait(500)
    it('검색된 숙소 카테고리에 "전망좋은" 값이 있는지 확인한다.', () => {
      cy.get('[data-cy="room-category"]').first().contains('전망좋은')
    })
  })

  it('선택한 "자연" 카테고리에 맞는 숙소가 보여지는지 확인한다.', () => {
    cy.get('[data-cy="category-filter-자연"]').click()
    cy.wait(500)
    it('검색된 숙소 카테고리에 "자연" 값이 있는지 확인한다.', () => {
      cy.get('[data-cy="room-category"]').first().contains('자연')
    })
  })
})

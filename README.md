# My Favorite Musics

> 2021 Practical Coding React-Node JS Web Project

## 기능

- itunes 앨범 검색
  - Infinite Scroll Pagination 적용
- 좋아요 / 좋아요 취소
- 좋아요한 앨범들 확인하기
- 한 주의 Billboard Weekly Top 10 Chart 확인하기
  - rapidapi.com의 Billboard-API 사용
  - 토요일마다 업데이트

## 역할

- 권대휘 : 좋아요 / 좋아요 취소
- 강환희 : 좋아요한 앨범들 확인하기 탭
- 신현석 : Vertical Tab, Infinite Scroll
- 김승은 : 전체적인 보완 및 완성, Chart 탭, Merging

## 실행 방법

```
$ git clone https://git.ajou.ac.kr/julie0005/my-favorite-musics.git
$ cd my-favorite-musics
$ cd server
$ npm install
$ node app.js
```

## TroubleShooting

1. Infinite Scroll
   - 앨범 검색에서 1차 검색을 한 후, 이어서 검색을 했을 때 프론트단이 바뀌지 않았던 문제
     - 백에서 데이터는 잘 가져왔지만 프론트에서의 state 관리 문제. state 변수가 너무 많아 초기화에 어려움을 겪었음
     - infinite scroll을 VerticalTab.js에서 적용하여 MusicList의 state 변수를 줄임
   - 무슨 영역에 Infinite Scroll을 적용할 것인가 토의를 할 때 Music List에 적용했더니 Favorite 탭에서도 반강제적으로 적용을 해야했던 문제
     - MusicList.js에서 infinite scroll 태그를 적용한 것을 VerticalTab.js에서 MusicList 태그 바깥으로 태그를 적용하는 것으로 변경.
     - 같은 성격의 탭이 반복된다면 클래스 안쪽에 infinite scroll 태그를 적용하는 것이 맞지만 탭마다 api 구조의 성격, 특징이 다르다면 태그 바깥으로 적용하는 것이 적절하다고 느꼈다.
2. 좋아요 / 좋아요 취소
   - 좋아요를 한 뒤, 좋아요 탭을 갔다가 다시 돌아오면 초기화가 되있었던 문제
     - musiclist 클래스를 생성할 때마다 favorite api를 호출하는 것으로 해결
     - 좋아요 탭을 눌렀을 때를 구분하여 불필요한 favorite api 호출을 막는 것으로 개선
3. 차트
   - Billboard-API는 월 50회만 과금없이 이용할 수 있어 테스트를 할 때 key를 바꿔야 했던 문제
     - key를 바꾸면서 해결

## 더 고민한다면

- key를 노출하는 보안 문제
- Favorite 탭에서 좋아요한 앨범들을 최신 순으로 나열해보기
- Favorite 탭에서도 infinite scroll 적용해보기
- 태그에 대한 확장성있는 설계

![demo](demo.gif)

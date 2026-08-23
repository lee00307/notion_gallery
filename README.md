# Notion Masonry Gallery

사진만 폴더에 넣으면 자동으로 읽어오는 GitHub Pages용 갤러리입니다.

1. `config.js`에서 `githubUser`를 본인 GitHub 아이디로 바꾸세요.
2. GitHub에서 Public 저장소 `notion-gallery`를 만들고 이 폴더의 파일을 전부 업로드하세요.
3. Settings → Pages → Deploy from a branch → main / (root) 로 켜세요.
4. `albums` 안에 폴더를 만들고 사진만 넣으세요.

예:
```
albums/
  doll-01/
    001.jpg
    IMG_3920.png
  jibril-perfume/
    photo1.jpg
    photo2.webp
```

파일명 목록을 따로 적을 필요 없습니다.

갤러리 주소:
`https://아이디.github.io/notion-gallery/gallery.html?album=doll-01`

같은 폴더에 사진을 추가하면 같은 URL에 자동으로 반영됩니다.

지원: jpg / jpeg / png / webp / gif / avif

참고: 공개 GitHub API로 폴더 목록을 읽는 방식이라 인증 없이 보통 IP당 시간당 60회 요청 제한이 있습니다. 개인 노션용으로는 대체로 충분합니다.

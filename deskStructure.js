export default (S) =>
  S.list()
    .title('Зміст')
    .items([
      S.listItem()
        .title('Статті')
        .child(
          S.list()
            .title('Статті')
            .items([
              S.listItem()
                .title('Усі')
                .child(S.documentTypeList('article').title('Усі статті')),
              S.listItem()
                .title('Новини')
                .child(
                  S.documentTypeList('article')
                    .title('Новини')
                    .filter('_type == "article" && category == "news"')
                ),
              S.listItem()
                .title('Духовність')
                .child(
                  S.documentTypeList('article')
                    .title('Духовність')
                    .filter('_type == "article" && category == "spiritual"')
                ),
              S.listItem()
                .title('Спільнота')
                .child(
                  S.documentTypeList('article')
                    .title('Спільнота')
                    .filter('_type == "article" && category == "community"')
                ),
            ])
        ),

      S.listItem()
        .title('Розклад')
        .child(
          S.list()
            .title('Розклад')
            .items([
              S.listItem()
                .title('Усі')
                .child(S.documentTypeList('schedule').title('Усі події')),
              S.listItem()
                .title('Літургії')
                .child(
                  S.documentTypeList('schedule')
                    .title('Літургії')
                    .filter('_type == "schedule" && category == "liturgy"')
                ),
              S.listItem()
                .title('Оголошення')
                .child(
                  S.documentTypeList('schedule')
                    .title('Оголошення')
                    .filter('_type == "schedule" && category == "announcement"')
                ),
            ])
        ),
    ]);


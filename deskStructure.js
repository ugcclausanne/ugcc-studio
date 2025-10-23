export default (S) =>
  S.list()
    .title('Контент')
    .items([
      S.listItem()
        .title('Статті')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Статті')),

      S.listItem()
        .title('Розклад')
        .child(
          S.list()
            .title('Розклад')
            .items([
              S.listItem()
                .title('Усе')
                .child(S.documentTypeList('schedule').title('Весь розклад')),
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
    ])

import { gql } from 'apollo-angular'

type Response = {
  pageTemplateCollection: any;
};

/**
 * Equivalent GraphQL query for the REST API call:
 * curl -i -X GET \
 * 'https://cdn.contentful.com/spaces/8utyj17y1gom/entries?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37&content_type=pageTemplate&include=1&fields.url=%2Fhome%2Fsupport'
 */
export const GET_ENTRY = gql`
  query {
    pageTemplateCollection(where: {seo_exists: true, seo: {sys: {id_exists: true}}}) {
      total
      limit
      items {
        url
        isShowVaButton
        seo {
          title
          description
        }
        onsiteSearchIndexing
      }
    }
  }
`
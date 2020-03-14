export type BlogPost = {
  slug: string
  title: string
  date: Date
  description: string
  tags: [string]
  banner: Banner
  content: string
}

type Banner = {
  title: string
  file: {
    url: string
    details: object
  }
}

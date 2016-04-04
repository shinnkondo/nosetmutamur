module ExportHelper

  # Output blog data as json. (Content itself is not included.)
  def serialize(articles)
    articles.map.with_index do |article, i| { 
      title: Titleize.titleize(article.title), 
      category: article.data.category, 
      tags: article.tags.sort, 
      lang: article.lang, 
      date: article.date.iso8601, 
      url: article.url, 
      summary: article.summary
    } 
    end.to_json
  end
    require 'set'

  # Output metadata for blogs in json.
  def metadata(articles)
    c = articles.map do |article|
      article.data.category
    end.uniq.sort
    l = articles.map do |article|
      article.lang
    end.uniq.sort
    t = articles.reduce(Set.new()) do |p, n|
      p + n.tags
    end.to_a.sort
    cl = {}# whether to show category for a lang
    articles.each do |article|
      cl[article.data.category] ||= {} 
      cl[article.data.category][article.lang] = true
    end
    {categories: c, langs: l, tags: t, category_lang: cl}.to_json
  end
end
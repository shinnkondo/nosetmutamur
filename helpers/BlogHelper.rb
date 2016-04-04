module BlogHelper
  # by the number of tags that is shared
  def related_articles()
    tag_counter = Hash.new(0)
    current_article.tags.each do |t|
      as = blog.local_articles.select do |a|
        a.tags.include?(t) and a != current_article 
      end.each do |a|
        tag_counter[a] += 1
      end
    end
    return tag_counter.keys.sort do |a, b|
      tag_counter[b] <=> tag_counter[a]
    end
  end
end
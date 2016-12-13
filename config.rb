# activate :livereload#, :host => '192.168.1.70', :no_swf => true
activate :syntax
set :markdown, :hard_wrap => false, :input => "GFM"

set :layout, "page"
activate :i18n, :langs => [:en, :ja], :mount_at_root => false # すべての言語ファイル URL に prefix がつく

activate :gemoji, :size => 18, :style => "vertical-align: middle"

Slim::Engine.disable_option_validator!
###
# Blog settings
###

Time.zone = "America/Chicago"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  # Matcher for blog source files
  blog.sources = "articles/{year}-{month}-{day}-{title}_{lang}.html"
  blog.permalink = "{lang}/{year}/{month}/{day}/{title}.html" 
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "article"
  # blog.summary_separator = /(<!-- more -->)/  # html comment does not work?
  # blog.summary_length = false
  # blog.year_link = "{lang}/{year}.html"
  # blog.month_link = "{lang}/{year}/{month}.html"
  # blog.day_link = "{lang}/{year}/{month}/{day}.html"
  blog.default_extension = ".md"

  blog.new_article_template = "source/_misc/article.tt"

  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", layout: false

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

helpers do
  require "titleize"
  def titleize(str)
    Titleize.titleize(str)
  end

  def translation(url)
    m = /(en|ja)\//.match(url)
    if m
      alturl = url.gsub(/(en|ja)\//, "/#{t :theotherlang}/")
      if (sitemap.find_resource_by_destination_path(alturl))
        return alturl
      end
    end
  end
end

set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'images'

configure :development do
  set :debug_assets, true
  Slim::Engine.set_options pretty: true
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_html
  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  set :url_root, 'http://shinkondo.github.io/'
  activate :search_engine_sitemap
 end

# activate :deploy do |deploy|
#   deploy.method = :git
#   # Optional Settings
#   deploy.remote   = 'git@github.com:shinkondo/shinkondo.github.io.git' # remote name or git url, default: origin
#   deploy.branch   = 'master' # default: gh-pages
#   # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
#   # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
# end

activate :external_pipeline,
  name: :webpack,
  command: build? ? 'npm run build' : 'npm run watch',
  source: "dist",
  latency: 1
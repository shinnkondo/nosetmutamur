MASTER_REPOSITORY= ''
PUBLISH_BRANCH = 'master'
DEST_DIR = 'build'

task default: %w[middleman]

task :serve do
    sh('bundle', 'exec', 'middleman')
end

task :build do
    sh('bundle', 'exec', 'middleman', 'build')
end

task :clean do
  require 'fileutils'
  Dir["#{DEST_DIR}/*"].each do |file|
    FileUtils.rm_rf file
  end
end

task :middleman do
    require 'rubygems'
    load Gem.bin_path('middleman-core', 'middleman')
end

task :test do
  require 'html/proofer'
  HTML::Proofer.new("./build", {
    href_ignore: [/.*\?.*/, /\{\{.*\}\}/, /#.*/],
    only_4xx: true
    }).run
end

task :deploy do
  initialize_repository MASTER_REPOSITORY, PUBLISH_BRANCH
  update_repository PUBLISH_BRANCH
  sh('bundle', 'exec', 'middleman', 'build')
  push_to_gh_pages MASTER_REPOSITORY, PUBLISH_BRANCH
end

def initialize_repository(repository, branch)
  require 'fileutils'

  if Dir["#{DEST_DIR}/.git"].empty?
    FileUtils.rm_rf DEST_DIR
    system "git clone --quiet #{repository} #{DEST_DIR} 2> /dev/null"
  end

  Dir.chdir DEST_DIR do
    sh "git checkout --orphan #{branch}"
  end
end

def update_repository(branch)
  Dir.chdir DEST_DIR do
    sh 'git fetch origin'
    sh "git reset --hard origin/#{branch}"
  end 
end


def push_to_gh_pages(repository, branch)
  sha1, _ = `git log -n 1 --oneline`.strip.split(' ')

  Dir.chdir DEST_DIR do
    sh 'git add -A'
    sh "git commit -m 'Update with #{sha1}'"
    system "git push --quiet #{repository} #{branch} 2> /dev/null"
  end
end
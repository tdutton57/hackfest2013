require 'open-uri'

class StaticPagesController < ApplicationController
  def getURL
  	query = params[:search]
  	query.gsub!(" ", "+")
    file = open("#{query}")
    @results = file.read
  end
end

=begin
require 'open-uri'
require 'nokogiri'

class StaticPagesController < ApplicationController
  def getURL
  	site = params[:site]
   	html_doc = Nokogiri::HTML(open("#{params[:search]}"))
   	result = html_doc.xpath("//p[@class~='class1']")
    @results = result
  end
end
=end


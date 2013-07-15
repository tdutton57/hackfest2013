require 'open-uri'

class StaticPagesController < ApplicationController
  def getURL
  	query = params[:search]
  	query.gsub!(" ", "+")
    file = open("#{query}")
    @results = file.read
  end
end
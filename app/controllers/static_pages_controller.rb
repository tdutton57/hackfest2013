require 'open-uri'

class StaticPagesController < ApplicationController
  def getURL
    file = open("#{params[:search]}")
    @results = file.read
  end
end

require "sinatra"
require 'json'
require "sqlite3"
require "pry"

DATABASE = SQLite3::Database.new("slidereel.db")
DATABASE.results_as_hash = true

require_relative "reel_handler"

get "/update/:id" do
  change_num = params[:id].to_i
  @slides = Reel_Handler.all
  slides_hash = @slides[change_num].to_hash
  json_slides = slides_hash.to_json
end

get "/" do
  @slides = Reel_Handler.all
  slides_hash = @slides.map{ |to_arrays|
      to_arrays.to_hash
    }
    
    json_slides = slides_hash.to_json
    
    erb :homepage
end

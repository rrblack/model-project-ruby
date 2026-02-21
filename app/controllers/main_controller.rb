class MainController < ApplicationController
  def index
  end

  def contact
  end

  def submit_contact
    @name = params[:name]
    @email = params[:email]
    @message = params[:message]

    puts "Name: #{@name}"
    puts "Email: #{@email}"
    puts "Message: #{@message}"

    ContactMailer.contact_email(@name, @email, @message).deliver_now

    redirect_to "/contact", notice: "It worked"
  end
end

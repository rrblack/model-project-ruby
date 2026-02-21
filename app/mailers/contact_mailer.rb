class ContactMailer < ApplicationMailer
  def contact_email(name, email, message)
    @name = name
    @email = email
    @message = message
    mail(to: "kyle@kylesjapan.life", subject: "Contact form from #{@name}")
  end
end

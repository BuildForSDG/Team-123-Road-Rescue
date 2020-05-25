// endpoints
// asterisks means required

post /users email*,password*, name*, mob_phone*, address, state
post /users/login email*, password*
post post/users/crashreport   name, number_victims, location*, user_id, image, video, message* (user must be authenticated)
post /users/crashreportanon name, number_victims, location*, user_id, image, video, message* (not authenticated)
post /users/contactus  name, email, message*
post /users/postMessage   user_id, message* (authenticated)
put /users/postMessage  update message  messaged_id* message
get /user/message   all users messages jwt
get /user userprofile jwt
put /users update user email*,password*, name*, mob_phone*, address*, state*
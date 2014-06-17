$ ->
  BASE_URL = "http://nazr.in/"

  $(document)
    .on("ajax:success", ".shorten_form", (data, status) ->
      $(".shorten_form .original_url").val(BASE_URL + status["d62"])
    )
    .on("ajax:error", ".shorten_form", (data, status) ->
      console.log data
    )

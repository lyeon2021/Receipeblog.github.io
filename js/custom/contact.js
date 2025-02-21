let form = document.getElementById("subscription-form");

//Adds email address in local storage if not already present for subscription.

form.addEventListener("submit", function (event) {
  event.preventDefault();
  subscribers_list = JSON.parse(localStorage.getItem("subscribers"));
  if (subscribers_list) {
    if (subscribers_list.includes(form.email.value)) {
      document.getElementById("subscription-confirmation").innerText =
        "You already have an active subscription using this email address.";
    } else {
      subscribers_list.push(form.email.value);
      localStorage.setItem("subscribers", JSON.stringify(subscribers_list));
      document.getElementById("subscription-confirmation").innerText =
        "Your subscription is confirmed. Thank you for subscribing to our emails.";
    }
  } else {
    subscribers_list = [form.email.value];
    localStorage.setItem("subscribers", JSON.stringify(subscribers_list));
    document.getElementById("subscription-confirmation").innerText =
      "Your subscription is confirmed. Thank you for subscribing to our emails.";
  }
});

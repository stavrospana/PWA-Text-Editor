const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let installPrompt; //creates an 'installPrompt' variable, which will be used to install the PWA

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) =>
{
  console.log('beforeinstallprompt event fired:', event);
  installPrompt = event; //assigns the beforeinstallprompt event to the 'installPrompt' variable
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () =>
{
  //when the install button is clicked, open the PWA installation prompt
  console.log('install button clicked');
  installPrompt.prompt();

  //await the user's response to the prompt
  const promptResponse = await installPrompt.userChoice;

  //if the user accepts the installation request, install the PWA, disable the install button, & clear the installPrompt variable
  if (promptResponse.outcome === 'accepted')
  {
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) =>
{
  //log that the app was successfully installed after the PWA is downloaded
  console.log('App Installed;', event);
});
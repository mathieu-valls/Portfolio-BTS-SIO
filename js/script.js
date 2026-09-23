// ==================================================
// POPUPS "EN SAVOIR PLUS"
// ==================================================


// Récupération de tous les boutons permettant
// d'ouvrir une popup

const boutonsModal = document.querySelectorAll(".bouton-modal");


// Récupération des boutons de fermeture

const boutonsFermer = document.querySelectorAll(".modal-fermer");


// Récupération de toutes les fenêtres popup

const modals = document.querySelectorAll(".modal");



// ==================================================
// OUVRIR UNE POPUP
// ==================================================

boutonsModal.forEach((bouton) => {

    bouton.addEventListener("click", () => {


        // Récupération de l'identifiant indiqué
        // dans data-modal

        const idModal = bouton.dataset.modal;


        // Recherche de la popup correspondante

        const modal = document.getElementById(idModal);


        // Ouverture de la popup

        if (modal) {

            modal.classList.add("active");

        }

    });

});



// ==================================================
// FERMER AVEC LA CROIX
// ==================================================

boutonsFermer.forEach((bouton) => {

    bouton.addEventListener("click", () => {


        // Recherche de la popup contenant
        // le bouton de fermeture

        const modal = bouton.closest(".modal");


        // Fermeture

        if (modal) {

            modal.classList.remove("active");

        }

    });

});



// ==================================================
// FERMER EN CLIQUANT EN DEHORS
// ==================================================

modals.forEach((modal) => {

    modal.addEventListener("click", (event) => {


        // Si l'utilisateur clique sur le fond noir
        // et non sur le contenu de la popup

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    });

});



// ==================================================
// FERMER AVEC LA TOUCHE ÉCHAP
// ==================================================

document.addEventListener("keydown", (event) => {


    if (event.key === "Escape") {


        modals.forEach((modal) => {

            modal.classList.remove("active");

        });

    }

});

/* ==================================================
   FORMULAIRE DE CONTACT - FORMSPREE
================================================== */

const formulaireContact = document.getElementById("form-contact");

if (formulaireContact) {

    formulaireContact.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* ==========================================
           SUPPRIMER L'ANCIEN MESSAGE DE SUCCÈS
        ========================================== */

        const ancienMessage =
            document.querySelector(".message-contact-succes");

        if (ancienMessage) {
            ancienMessage.remove();
        }


        /* ==========================================
           BOUTON
        ========================================== */

        const bouton = formulaireContact.querySelector(
            ".contact-bouton"
        );

        const donnees = new FormData(formulaireContact);

        bouton.disabled = true;

        bouton.innerHTML =
            '<i class="bi bi-hourglass-split"></i> Envoi en cours...';


        /* ==========================================
           ENVOI FORMSPREE
        ========================================== */

        try {

            const reponse = await fetch(
                formulaireContact.action,
                {
                    method: "POST",
                    body: donnees,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (!reponse.ok) {
                throw new Error("Erreur lors de l'envoi.");
            }


            /* ==========================================
               RÉINITIALISER LE FORMULAIRE
            ========================================== */

            formulaireContact.reset();

            bouton.disabled = false;

            bouton.innerHTML =
                '<i class="bi bi-send"></i> Envoyer le message';


            /* ==========================================
               MESSAGE DE SUCCÈS
            ========================================== */

            const messageSucces =
                document.createElement("div");

            messageSucces.className =
                "message-contact-succes";

            messageSucces.innerHTML = `
                <i class="bi bi-check-circle"></i>

                <h3>
                    Message envoyé !
                </h3>

                <p>
                    Votre message a bien été envoyé.
                    Merci pour votre contact.
                </p>
            `;


            formulaireContact.parentNode.insertBefore(
                messageSucces,
                formulaireContact
            );


        } catch (erreur) {

            bouton.disabled = false;

            bouton.innerHTML =
                '<i class="bi bi-send"></i> Envoyer le message';

            alert(
                "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
            );

        }

    });

}
/* ==================================================
   MENU PROJETS — MOBILE
================================================== */

const menuProjets = document.querySelector(".menu-projets");

if (menuProjets) {

    /* OUVRIR / FERMER LE SOUS-MENU */

    const boutonProjets = menuProjets.querySelector(":scope > a");

    boutonProjets.addEventListener("click", function (event) {

        if (window.innerWidth <= 900) {

            event.preventDefault();

            menuProjets.classList.toggle("menu-ouvert");

        }

    });


    /* FERMER LE SOUS-MENU APRÈS UN CLIC */

    const liensSousMenu = menuProjets.querySelectorAll(".sous-menu a");

    liensSousMenu.forEach(function (lien) {

        lien.addEventListener("click", function () {

            menuProjets.classList.remove("menu-ouvert");

        });

    });

}
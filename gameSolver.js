// ==UserScript==
// @name         Energy Star Night 2021 Game Bot
// @namespace    https://github.com/Teutonen/ESN21-Bot/blob/main/gameSolver.js
// @version      0.2
// @description  Win tickets for the Energy Star Night 2021
// @author       Teutonen https://github.com/teutonen
// @match        game.energy.ch/
// @run-at       document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @match        *://*/recaptcha/api2/*
// @connect      engageub.pythonanywhere.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==
$(document).ready(function() {

    const questions = {
        "WANN WIRD DIE ENERGY STAR NIGHT STATTFINDEN?": "19. November 2021",
        "WANN BEGINNT DIE ENERGY STAR NIGHT?": "19:00",
        "WIE KOMMT MAN AN TICKETS FÜR DIE ENERGY STAR NIGHT?": "Gewinnen",
        "WELCHER YOUTUBE STAR JAMMTE BEIM ENERGY AIR 2017 2017 BACKSTAGE MIT SAMU VON SUNRISE AVENUE? ": "Alex Aiono",
        "WIE HEISST DIE LUSTIGE ASSISTENTIN VON BUSTER MOON?": "Miss Crawly",
        "WAS WAR DAS THEMA DER LETZTEN ENERGY STAR NIGHT?": "WELCOME TO THE CANDY FACTORY",
        "WELCHER HERAUSFORDERUNG MUSS SICH ROSITA IN DER SHOW STELLEN?": "An einem Seil in die Tiefe springen",
        "WELCHER U2-SONG WIRD IM TRAILER VON SING – DIE SHOW DEINES LEBENS GESPIELT?": "I Still Haven’t Found What I’m Looking For",
        "WELCHER SCHWEIZER ACT HAT 2019 DEN ENERGY MUSIC AWARD GEWONNEN?": "Luca Hänni",
        "WIE VIELE BESUCHER MACHEN DIE ENERGY STAR NIGHT ZUM GRÖSSTEN INDOOR-MUSIK-EVENT DER SCHWEIZ?": "13'000",
        "WAS IST ENERGY ONE?": "Die Membership von Energy",
        "WAS FÜR EIN WORT MUSST DU PER SMS SCHICKEN, UM TICKETS ZU GEWINNEN?": "STAR",
        "WIE LAUTET DER OFFIZIELLE HASHTAG DER ENERGY STAR NIGHT?": "#ESN21",
        "WELCHER ACT WAR AM ERSTEN ENERGY STARS FOR FREE UND SCHON WEITERE SECHS MAL DABEI?": "Bligg",
        "SEIT WANN IST ENERGY LUZERN LIVE ON AIR?": "August 2021",
        "WELCHES DJ-DUO RIESS 2016 DAS HALLENSTADION AB?": "Remady &amp; Manu L",
        "WO FINDET DIE NEUE MUSIK-SHOW STATT?": "Redshore City",
        "WER SPRICHT DIE ORIGINALSTIMME VON CLAY CALLOWAY?": "Bono",
        "WIE ALT MUSS MAN SEIN, UM OHNE ERWACHSENE BEGLEITUNG AN DER ENERGY STAR NIGHT TEILZUNEHMEN?": "14",
        "WELCHE ZWEI ACTS LASEN AN DER ESN18 BACKSTAGE MEAN TWEETS?": "Olly Murs und James Arthur",
        "WELCHER ACT HAT AN EINER ENERGY STAR NIGHT BACKSTAGE EINEM FAN EIN TATTOO GESTOCHEN?": "Sido",
        "WIE HEISST DER OFFIZIELLE INSTAGRAM ACCOUNT DER ENERGY STAR NIGHT?": "@energystarnight",
        "WER HAT DEN ERSTEN ENERGY MUSIC AWARD GEWONNEN?": "Manillo",
        "AN DER ENERGY STAR NIGHT 2019 HABEN WIR DAS GRÖSSTE TIKTOK-VIDEO MIT 13'000 LEUTEN GEMACHT. WAS FÜR EINE CHALLENGE WAR ES?": "WOKEUPLIKETHISCHALLENGE",
        "WEN HAT HERR BÜNZLI AN SEINER ERSTEN ENERGY STAR NIGHT 2017 INTERVIEWT?": "Anastacia &amp; Mark Forster ",
        "WANN FAND DER EVENT ZUM ERSTEN MAL STATT?": "2003",
        "WIE HEISST DIE TOCHTER DES SHOW MANAGERS?": "Porsha",
        "WELCHER NIEDERLÄNDISCHE DJ TRAT 2016 BEI DER ENERGY STAR NIGHT AUF?": "Martin Garrix",
        "WO FINDET DIE ENERGY STAR NIGHT STATT?": "Im Hallenstadion Zürich",
        "WELCHER ACT WAR NOCH NIE AN DER ENERGY STAR NIGHT DABEI?": "Loredana",
        "WIE HEISST DIE FRAU VON HERR BÜNZLI?": "Anegret",
        "WELCHER AWARD WIRD IM RAHMEN DER ENERGY STAR NIGHT VERLIEHEN?": "Der Energy Music Award",
        "WO FINDET DIE AFTERSHOW PARTY STATT?": "Kaufleuten",
        "WIE KOMMT MAN AN TICKETS FÜR DIE ENERGY STAR NIGHT?": "Gewinnen",
        "WAS WAR DAS BESONDERE AN DER ÜBERGABE DES ENERGY MUSIC AWARD 2020?": "Wir haben Loco Escrito bei der Übergabe geprankt",
        "WER SPRICHT DIE ROLLE VON ASH AUF DEUTSCH?": "Stefanie Kloss",
        "WELCHER ACT ERÖFFNETE DIE ENERGY STAR NIGHT 2019?": "Tom Gregory",
        "WAS FÜR EIN INSTRUMENT SPIELT ASH?": "E-Gitarre",
        "WER ÜBERZEUGT DEN GROSSEN STAR CLAY CALLOWAY, AN DER SHOW TEILZUNEHMEN?": "Ash",
        "IN WELCHEM JAHR WURDE DAS ENERGY STARS FOR FREE ZUR ENERGY STAR NIGHT?": "2017",
        "IN WELCHEN STÄDTEN GIBT ES ENERGY-RADIOSENDER?": "«Basel, Bern und Zürich"
    }

    function randomNumber () {
        return Math.floor(Math.random() * (1200 - 800 + 1)) + 1200; //speed
    }

    function currentQuestion () {
        if ($('h3.question-text').html() != null){
            return $('h3.question-text').html().toUpperCase()
        }
    }

    function nextQuestion () {
        $('button#next-question').trigger('click')
        setTimeout(makeAction, randomNumber())
    }

    function startGame () {
        console.log('game starten')
        $('.game-button').trigger('click');
        setTimeout(answerQuestion, randomNumber())
    }

    function restartGame () {
        console.log('restart')
        $('button#lose').trigger('click');
        setTimeout(makeAction, randomNumber())
    }

    function selectBubble () {
        console.log('bubble auswählen')
        document.getElementsByTagName('img')[2].click();
        setTimeout(makeAction, randomNumber())
    }

    function decisionTicket () {
        console.log('sagen dass tickets gewinnen')
        document.getElementsByTagName('img')[2].click();
        setTimeout(selectBubble, randomNumber())
    }

    function answerQuestion () {
        let curr = currentQuestion()
        console.log(curr, questions[curr])
        $('#answers .answer-wrapper').each((i, el) => {
            if ($(el).children('label').html() === questions[curr]) {
                $(el).children('input').trigger('click')
            }
        })
        setTimeout(nextQuestion, randomNumber())
    }

    function makeAction () {
        if (document.getElementById('lose')){
            restartGame()
        } else if (document.getElementsByTagName('h3')[0].innerText == 'DU HAST DIE ERSTE HÜRDE GESCHAFFT.\nUM WELCHEN PREIS MÖCHTEST DU SPIELEN?'){
            decisionTicket()
        } else if (document.getElementById('verification')){
            startGame()
        } else {
            answerQuestion()
        }
    }

    (function() {
        'use strict';

        console.log('starting...')
        makeAction()

    })();

});

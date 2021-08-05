#!/bin/bash

printf 'password123\npassword123\nIskandre Muchery\nAREA\nEPITECH\nMontpellier\nHerault\nFR\nyes\n' | keytool -genkey -v -keystore area_release.keystore -alias area_key -keyalg RSA -keysize 2048 -validity 10000

mv area_release.keystore ./app
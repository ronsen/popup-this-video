.PHONY: zip

zip:
	rm -f ~/downloads/chrome.zip ~/downloads/firefox.zip
	cd chrome && zip -r -X ~/downloads/chrome.zip *
	cd firefox && zip -r -X ~/downloads/firefox.zip *
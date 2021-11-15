#!/bin/bash

. ~/.nvm/nvm.sh

nvm use 8

export FABRIC_VERSION=hlfv11

composer archive create -t dir -n bna/ -a organ-donation-chain.bna

./startFabric.sh

./createPeerAdminCard.sh

composer network install --card PeerAdmin@hlfv1 -a organ-donation-chain.bna

composer network start -c PeerAdmin@hlfv1 -n organ-donation-chain -V 0.0.23 -A admin -S adminpw

composer-rest-server -c admin@organ-donation-chain -n never -u true -d n -w true -p 3001
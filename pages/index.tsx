import Head from 'next/head';
import firebase from 'firebase/app';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { Fade } from '@chakra-ui/transition';
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/modal';
import { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import Feed from 'components/Feed';
import Header from 'components/Header';

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(firebase.auth());
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const checkIfTheUserIsLogged = () => {
    if (!loading && user === null) {
      router.push('/login');
    }
  };

  checkIfTheUserIsLogged();

  const onCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  return (
    <>
      <div>
        <Head>
          <title>
            SA |
            {' '}
            {user?.displayName || 'Anônimo'}
          </title>
        </Head>

        <Fade in={router.isReady}>
          <Header onOpenUserModal={() => setIsUserModalOpen(true)} />

          <Feed />
        </Fade>
      </div>
      <Modal isOpen={isUserModalOpen} onClose={onCloseUserModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader d="flex" alignItems="center">
            <Avatar src={user?.photoURL} mr={3} />
            {user?.displayName || 'Anônimo'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{user?.email || 'Você entrou como anônimo'}</ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

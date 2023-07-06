import {
  AspectRatio,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillYoutube } from 'react-icons/ai';

export default function PlayYoutubeButton({ url }: { url: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const urlId = url.split('v=')[1];
  return (
    <>
      <Stack
        as="button"
        bgColor="red.800"
        py={3}
        rounded="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => {
          onOpen();
        }}
      >
        <Icon as={AiFillYoutube} boxSize={5} />
      </Stack>

      <Modal isCentered isOpen={isOpen} size="4xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalBody m={0} p={0}>
            <AspectRatio maxW="4xl" ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${urlId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

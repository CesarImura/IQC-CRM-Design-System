"use client"

import { useState } from "react"

import { Button } from "@/registry/iq/ui/button"
import { Modal, ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTrigger } from "@/registry/iq/ui/modal"

export default function ModalDemo() {
  const [deleted, setDeleted] = useState(false)
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Modal>
        <ModalTrigger asChild>
          <Button variant="secondary">Edit deal</Button>
        </ModalTrigger>
        <ModalContent size="md">
          <ModalHeader eyebrow="Acme Robotics" title="Edit deal" description="Changes are saved to the pipeline and shared with the deal team." />
          <ModalBody>
            <p>Round: Series A · Lead: Northwind Ventures · Target close: 29 Sep 2026.</p>
            <p>Use the body for forms, summaries or anything the task needs. It grows with its content.</p>
          </ModalBody>
          <ModalFooter layout="double">
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <ModalClose asChild>
              <Button>Save deal</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="danger-outline">{deleted ? "Deleted" : "Delete deal"}</Button>
        </ModalTrigger>
        <ModalContent size="sm">
          <ModalHeader title="Delete this deal?" description="The deal and its notes will be removed for everyone. This can’t be undone." />
          <ModalFooter layout="double">
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <ModalClose asChild>
              <Button variant="danger" onClick={() => setDeleted(true)}>
                Delete
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

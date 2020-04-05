import { Injectable } from '@angular/core'
import { Note } from '../interfaces/note'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[] = []
  public loaded = false

  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('notes').then((notes) => {
        if (notes != null) {
          this.notes = notes
        }

        this.loaded = true
        resolve(true)
      })
    })
  }

  save(): void {
    this.storage.set('notes', this.notes)
  }

  getNote(id): Note {
    return this.notes.find(note => note.id === id)
  }

  createNote(noteTitle): void {
    // tslint:disable-next-line:radix
    const id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1
    this.notes.push({
      id: id.toString(),
      title: noteTitle,
      content: ''
    })
    this.save()
  }

  deleteNote(note): void {
    const index = this.notes.indexOf(note)
    if (index > -1) {
      this.notes.splice(index, 1)
      this.save()
    }
  }
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Note } from '../interfaces/note'
import { NotesService } from '../services/notes.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public note: Note

  constructor(private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController) {
    this.note = {
      id: '',
      title: '',
      content: ''
    }
  }

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id')

    this.notesService.getNote(noteId).subscribe(note => {
      this.note = note
    })
  }

  noteChanged() {
    // this.notesService.save()
  }

  deleteNote() {
    this.notesService.deleteNote(this.note)
    this.navCtrl.navigateBack('/notes')
  }
}

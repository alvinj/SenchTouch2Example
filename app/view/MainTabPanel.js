/*
 * File: app/view/MainTabPanel.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TabPanelDemo.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',

    config: {
        items: [
            {
                xtype: 'container',
                title: 'Notes',
                iconCls: 'info',
                id: 'NotesTab',
                itemId: 'mycontainer',
                layout: {
                    type: 'card'
                },
                scrollable: 'vertical',
                items: [
                    {
                        xtype: 'list',
                        id: 'NotesList',
                        itemId: 'NotesList',
                        itemTpl: [
                            '<div>{note}</div>'
                        ],
                        store: 'NotesStore'
                    },
                    {
                        xtype: 'panel',
                        id: 'NotesDetailPanel',
                        itemId: 'mypanel',
                        tpl: [
                            '<div class="title">{title}</div>',
                            '<div class="note">{note}</div>'
                        ]
                    },
                    {
                        xtype: 'formpanel',
                        id: 'NotesForm',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'titleTextField',
                                label: 'Title'
                            },
                            {
                                xtype: 'textareafield',
                                label: 'Note'
                            },
                            {
                                xtype: 'button',
                                id: 'saveButton',
                                itemId: 'mybutton2',
                                text: 'Save'
                            },
                            {
                                xtype: 'button',
                                id: 'cancelButton',
                                itemId: 'mybutton3',
                                text: 'Cancel'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'To-Do',
                iconCls: 'organize',
                id: 'ToDoTab'
            },
            {
                xtype: 'container',
                title: 'URLs',
                iconCls: 'favorites',
                id: 'UrlsTab'
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'NavToolbar',
                items: [
                    {
                        xtype: 'button',
                        hidden: true,
                        id: 'backButton',
                        itemId: 'mybutton',
                        ui: 'back',
                        text: 'Back'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'addButton',
                        itemId: 'mybutton1',
                        text: 'Add'
                    }
                ]
            }
        ],
        tabBar: {
            docked: 'bottom'
        },
        listeners: [
            {
                fn: 'onNotesListSelect',
                event: 'select',
                delegate: '#NotesList'
            },
            {
                fn: 'onNotesDetailPanelShow',
                event: 'show',
                delegate: '#NotesDetailPanel'
            },
            {
                fn: 'onSaveButtonTap',
                event: 'tap',
                delegate: '#saveButton'
            },
            {
                fn: 'onCancelButtonTap',
                event: 'tap',
                delegate: '#cancelButton'
            },
            {
                fn: 'onBackButtonTap',
                event: 'tap',
                delegate: '#backButton'
            },
            {
                fn: 'onAddButtonTap',
                event: 'tap',
                delegate: '#addButton'
            }
        ]
    },

    onNotesListSelect: function(dataview, record, eOpts) {
        var notesTab = this.getActiveItem();
        var notesDetailPanel = notesTab.down('panel');
        notesDetailPanel.setRecord(record);
        notesTab.setActiveItem(notesDetailPanel);

    },

    onNotesDetailPanelShow: function(component, eOpts) {
        var backButton = Ext.getCmp('backButton');
        backButton.show();

    },

    onSaveButtonTap: function(button, e, eOpts) {
        var currentTab = this.getActiveItem();
        var notesPanel = currentTab.getActiveItem();
        var values = notesPanel.getValues();

        var store = Ext.data.StoreManager.lookup('NotesStore');

        if (values.id === null) {
            // add
            var record = Ext.ModelMgr.create(values, 'TabPanelDemo.model.Note'); 
            store.add(record);
        } else {
            // edit
            // i don't have an id, this may be a problem
            var record = store.getById(values.id);
            record.set('title', values.title);
            record.set('note', values.note);
        } 

        store.sync(); 
        notesPanel.reset(); 
        currentTab.setActiveItem( 0);

    },

    onCancelButtonTap: function(button, e, eOpts) {
        var currentTab = this.getActiveItem();
        currentTab.setActiveItem(0);

    },

    onBackButtonTap: function(button, e, eOpts) {
        // get the current tab
        var currentTab = this.getActiveItem();
        // go to the first item in the tab
        currentTab.setActiveItem(0);
        button.hide();

    },

    onAddButtonTap: function(button, e, eOpts) {
        // TODO: copied this from the 'Edit' button code
        // needs some changes
        var currentTab = this.getActiveItem();
        //var notesDetailPanel = currentTab.getActiveItem();

        // 2 == NotesForm?
        currentTab.setActiveItem(2);
        var notesForm = currentTab.getActiveItem();
        //notesForm.setRecord(notesDetailPanel.getRecord());
        this.setActiveItem(currentTab);

        // hide this because a Cancel button is used
        var backButton = Ext.getCmp('backButton');
        backButton.hide();


    }

});